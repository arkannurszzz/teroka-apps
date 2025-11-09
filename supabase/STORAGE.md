# 🗂️ Supabase Storage Setup - Teroka App

Panduan lengkap untuk setup Supabase Storage untuk upload gambar UMKM.

## 📋 Daftar Isi

- [Pengenalan](#pengenalan)
- [Setup Storage Bucket](#setup-storage-bucket)
- [Konfigurasi RLS Policies](#konfigurasi-rls-policies)
- [Upload Image dari Frontend](#upload-image-dari-frontend)
- [Update Registration Form](#update-registration-form)
- [Best Practices](#best-practices)

---

## 🎯 Pengenalan

**Supabase Storage** memungkinkan kamu untuk:
- Upload dan menyimpan gambar UMKM
- Serve images dengan CDN global
- Image resizing dan transformations
- Access control dengan Row Level Security

**Saat ini:** Form registration menggunakan URL gambar dari internet
**Upgrade:** Upload gambar langsung dari device ke Supabase Storage

---

## 🚀 Setup Storage Bucket

### Step 1: Buat Storage Bucket

1. Buka Supabase Dashboard
2. Klik **Storage** di sidebar kiri
3. Klik **New Bucket**
4. Isi form:
   - **Name:** `umkm-images`
   - **Public bucket:** ✅ Centang (agar gambar bisa diakses publik)
5. Klik **Create Bucket**

### Step 2: Setup Folder Structure (Optional)

Dalam bucket `umkm-images`, kamu bisa buat folder:
```
umkm-images/
├── logos/           # Logo UMKM
├── covers/          # Cover photos
├── products/        # Product images
└── reviews/         # Review images dari customer
```

---

## 🔒 Konfigurasi RLS Policies

### Default Policies (sudah di-set saat buat bucket public)

Jika bucket sudah public, RLS otomatis allow read untuk semua.
Untuk upload, kita perlu tambah policy.

### SQL untuk Storage Policies

Jalankan di SQL Editor:

```sql
-- ============================================================================
-- STORAGE POLICIES untuk umkm-images bucket
-- ============================================================================

-- Policy 1: Semua user bisa READ/SELECT images (sudah otomatis jika bucket public)
-- Policy ini memungkinkan semua orang melihat gambar

-- Policy 2: Semua user bisa UPLOAD images (untuk development)
-- ⚠️ Untuk production, batasi hanya authenticated users
INSERT INTO storage.policies (
  name,
  bucket_id,
  definition,
  check_definition
)
SELECT
  'Enable insert for all users',
  id,
  'true',
  'true'
FROM storage.buckets
WHERE name = 'umkm-images';

-- Policy 3: Semua user bisa UPDATE images (untuk development)
INSERT INTO storage.policies (
  name,
  bucket_id,
  definition,
  check_definition
)
SELECT
  'Enable update for all users',
  id,
  'true',
  'true'
FROM storage.buckets
WHERE name = 'umkm-images';

-- Policy 4: Semua user bisa DELETE images (untuk development)
INSERT INTO storage.policies (
  name,
  bucket_id,
  definition,
  check_definition
)
SELECT
  'Enable delete for all users',
  id,
  'true',
  'true'
FROM storage.buckets
WHERE name = 'umkm-images';

-- ============================================================================
-- PRODUCTION POLICIES (lebih ketat)
-- ============================================================================
-- Uncomment ini untuk production dengan authentication:

/*
-- Hanya authenticated users bisa upload
INSERT INTO storage.policies (
  name,
  bucket_id,
  definition,
  check_definition
)
SELECT
  'Enable insert for authenticated users only',
  id,
  'auth.role() = ''authenticated''',
  'auth.role() = ''authenticated'''
FROM storage.buckets
WHERE name = 'umkm-images';

-- Hanya owner yang bisa update/delete (by user ID)
INSERT INTO storage.policies (
  name,
  bucket_id,
  definition,
  check_definition
)
SELECT
  'Enable update for owners only',
  id,
  '(storage.foldername(name))[1] = auth.uid()::text',
  '(storage.foldername(name))[1] = auth.uid()::text'
FROM storage.buckets
WHERE name = 'umkm-images';
*/
```

---

## 💻 Upload Image dari Frontend

### Step 1: Install Dependencies (sudah ter-install)

```bash
# Sudah ter-install dari @supabase/supabase-js
npm install @supabase/supabase-js
```

### Step 2: Create Upload Utility

File: `src/lib/upload.ts`

```typescript
import { supabase } from './supabase';

export async function uploadImage(
  file: File,
  folder: 'logos' | 'covers' | 'products' | 'reviews' = 'covers'
): Promise<{ url: string | null; error: string | null }> {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        url: null,
        error: 'Hanya file gambar (JPG, PNG, WebP) yang diperbolehkan'
      };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        url: null,
        error: 'Ukuran file maksimal 5MB'
      };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('umkm-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { url: null, error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('umkm-images')
      .getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Upload exception:', error);
    return {
      url: null,
      error: 'Terjadi kesalahan saat upload gambar'
    };
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  try {
    // Extract path from URL
    const urlParts = url.split('/storage/v1/object/public/umkm-images/');
    if (urlParts.length < 2) return false;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('umkm-images')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete exception:', error);
    return false;
  }
}
```

---

## 📝 Update Registration Form

### Update Form dengan Image Upload

File: `src/app/register/page.tsx`

**Tambahkan state untuk file:**

```typescript
const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string>('');
const [uploading, setUploading] = useState(false);
```

**Tambahkan handler untuk file input:**

```typescript
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
```

**Update submit handler:**

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageUrl = formData.image;

    // Upload image if file selected
    if (imageFile) {
      setUploading(true);
      const { url, error } = await uploadImage(imageFile, 'covers');
      setUploading(false);

      if (error) {
        toast.error(error);
        setLoading(false);
        return;
      }

      imageUrl = url || '';
    }

    // Prepare data for submission
    const dataToSubmit = {
      ...formData,
      image: imageUrl,
      established_year: formData.established_year ? parseInt(formData.established_year) : null,
      employee_count: formData.employee_count ? parseInt(formData.employee_count) : 0,
    };

    // ... rest of submit logic
  } catch (error) {
    // ... error handling
  }
};
```

**Replace URL input dengan file input:**

```tsx
{/* Image Upload */}
<div>
  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
    Foto/Logo UMKM
  </label>

  {imagePreview && (
    <div className="mb-3 relative w-full h-48 rounded-lg overflow-hidden">
      <Image
        src={imagePreview}
        alt="Preview"
        fill
        className="object-cover"
      />
    </div>
  )}

  <input
    id="image"
    name="image"
    type="file"
    accept="image/jpeg,image/jpg,image/png,image/webp"
    onChange={handleImageChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
  />
  <p className="mt-1 text-xs text-gray-500">
    Format: JPG, PNG, WebP. Max 5MB
  </p>
</div>
```

---

## 🎨 Image Transformations

Supabase Storage mendukung image transformations on-the-fly:

```typescript
// Original URL
const originalUrl = 'https://xxx.supabase.co/storage/v1/object/public/umkm-images/covers/image.jpg';

// Resize to width 400px
const resizedUrl = `${originalUrl}?width=400`;

// Resize with quality
const optimizedUrl = `${originalUrl}?width=800&quality=80`;

// Multiple transformations
const transformedUrl = `${originalUrl}?width=400&height=300&resize=cover&quality=75`;
```

**Transformations yang tersedia:**
- `width` - Resize by width
- `height` - Resize by height
- `quality` - JPEG quality (0-100)
- `resize` - Mode: cover, contain, fill
- `format` - Convert to: webp, jpg, png

---

## ✅ Best Practices

### 1. File Naming Convention

```typescript
// Good: timestamp + random string
const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

// Bad: original filename (bisa conflict)
const fileName = file.name;
```

### 2. File Validation

```typescript
// Always validate:
- File type (image/jpeg, image/png, etc)
- File size (max 5MB recommended)
- Image dimensions (optional)
```

### 3. Image Optimization

```typescript
// Before upload, compress image (optional)
import imageCompression from 'browser-image-compression';

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true
};

const compressedFile = await imageCompression(file, options);
```

### 4. Error Handling

```typescript
// Always handle errors gracefully
try {
  const result = await uploadImage(file);
  if (result.error) {
    toast.error(result.error);
    return;
  }
  // Success
} catch (error) {
  toast.error('Upload gagal');
}
```

### 5. Loading States

```tsx
{uploading && (
  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
      <p className="text-sm text-gray-600">Uploading...</p>
    </div>
  </div>
)}
```

---

## 🔧 Testing Storage

### Test Upload Manual

1. Buka Supabase Dashboard → Storage → umkm-images
2. Klik **Upload file**
3. Pilih gambar
4. Upload
5. Klik file yang di-upload
6. Copy **Public URL**
7. Test URL di browser

**Public URL Format:**
```
https://[project-id].supabase.co/storage/v1/object/public/umkm-images/covers/image.jpg
```

### Test dari Frontend

```typescript
// Test upload
const testFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
const result = await uploadImage(testFile);
console.log(result.url);
```

---

## 📊 Storage Limits

**Free Plan:**
- Storage: 1GB
- Transfer: 2GB/month
- File size: 50MB per file

**Pro Plan:**
- Storage: 100GB
- Transfer: 200GB/month
- File size: 5GB per file

---

## 🚨 Troubleshooting

### Error: "new row violates row-level security policy"

**Solusi:**
- Check RLS policies di Storage dashboard
- Pastikan policy allow INSERT untuk anonymous users (development)
- Jalankan SQL policies di atas

### Error: "The resource already exists"

**Solusi:**
- File dengan nama yang sama sudah ada
- Gunakan `upsert: true` atau generate unique filename

### Image tidak muncul

**Solusi:**
- Check bucket public setting
- Verify Public URL format benar
- Check next.config.ts sudah include `*.supabase.co` di remotePatterns

---

## 📚 Resources

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Image Transformations](https://supabase.com/docs/guides/storage/serving/image-transformations)
- [CDN & Caching](https://supabase.com/docs/guides/storage/cdn/fundamentals)

---

**Status Saat Ini:**
- ✅ Next.js image config sudah support `*.supabase.co`
- ⏳ Storage bucket belum dibuat (optional, bisa pakai URL dulu)
- ⏳ Upload utility belum dibuat (optional upgrade)

**Rekomendasi:**
- Untuk MVP: Pakai URL gambar dari Unsplash (sudah implemented) ✅
- Untuk production: Setup storage bucket dan implement upload

---

**Last Updated:** 2025-01-09
**Version:** 1.0.0
