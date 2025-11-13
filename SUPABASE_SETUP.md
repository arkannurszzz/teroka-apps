# 🚀 Quick Setup Supabase - Teroka App

Panduan singkat setup Supabase untuk Teroka App.

## 📝 Step-by-Step

### 1. Buat Project Supabase

1. Buka [https://supabase.com](https://supabase.com) dan login/signup
2. Klik **"New Project"**
3. Isi form:
   - **Name:** `teroka-app` (atau nama lain)
   - **Database Password:** Buat password yang kuat (simpan baik-baik!)
   - **Region:** Singapore (paling dekat dengan Indonesia)
4. Klik **"Create new project"**
5. Tunggu ~2 menit sampai project selesai dibuat

### 2. Setup Database Schema

1. Di dashboard Supabase, buka menu **SQL Editor** (icon database di sidebar kiri)
2. Klik **"+ New Query"**
3. Copy-paste semua isi file **`supabase/schema.sql`**
4. Klik **"Run"** atau tekan `Ctrl + Enter`
5. Pastikan muncul pesan sukses (tidak ada error merah)

### 3. Inject Data

1. Di SQL Editor, klik **"+ New Query"** lagi
2. Copy-paste semua isi file **`supabase/seed.sql`**
3. Klik **"Run"**
4. Verifikasi data sudah masuk dengan query:
   ```sql
   SELECT * FROM umkm;
   ```
   Seharusnya muncul 10 data UMKM

### 4. Get API Credentials

1. Di dashboard Supabase, buka **Settings** (icon gear di sidebar kiri bawah)
2. Klik **API** di menu settings
3. Copy 2 nilai ini:
   - **Project URL** → contoh: `https://xxxxx.supabase.co`
   - **anon public** key (di bagian Project API keys) → string panjang yang dimulai dengan `eyJ...`

### 5. Setup Environment Variables

1. Copy file **`.env.example`** menjadi **`.env.local`** (atau `.env`):
   ```bash
   # Windows
   copy .env.example .env.local

   # Mac/Linux
   cp .env.example .env.local
   ```

2. Buka file **`.env.local`** dan replace dengan credentials yang kamu copy tadi:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
   ```

3. Save file `.env.local`

**Note:**
- File `.env.local` tidak akan ter-commit ke git (sudah di-gitignore)
- File `.env.example` adalah template yang di-commit sebagai contoh
- Gunakan `.env.local` untuk development (prioritas lebih tinggi)
- Gunakan `.env` untuk production/shared values

### 6. Test Aplikasi

1. Restart development server:
   ```bash
   npm run dev
   ```

2. Buka browser di `http://localhost:3000`

3. Cek apakah data UMKM dari Supabase muncul di halaman search

4. Coba klik salah satu UMKM untuk lihat detail (termasuk products dan reviews)

## ✅ Verifikasi

Untuk memastikan semuanya jalan, buka SQL Editor dan jalankan query ini:

```sql
-- Check total data
SELECT
    (SELECT COUNT(*) FROM umkm) as total_umkm,
    (SELECT COUNT(*) FROM products) as total_products,
    (SELECT COUNT(*) FROM reviews) as total_reviews;
```

**Expected result:**
- total_umkm: 10
- total_products: 15
- total_reviews: 23

## 🗂️ Struktur Database

```
umkm (10 data)
├── id (UUID)
├── name
├── category (makanan, minuman, jasa, fashion)
├── description
├── address, city, province
├── latitude, longitude
├── contact, operating_hours
├── rating (auto-calculated)
├── total_reviews (auto-calculated)
└── ... (lihat schema.sql untuk lengkapnya)

products (15 data)
├── id (UUID)
├── umkm_id (FK → umkm)
├── name
├── price
├── description
└── image

reviews (23 data)
├── id (UUID)
├── umkm_id (FK → umkm)
├── user_name
├── rating (1-5)
├── comment
└── images
```

## 📄 Files yang Dibuat

```
teroka-apps/
├── .env.local                    # Environment variables (jangan commit!)
├── .env.example                  # Template env vars
├── src/
│   ├── lib/
│   │   └── supabase.ts           # Supabase client
│   ├── types/
│   │   ├── database.ts           # Database type definitions
│   │   └── umkm.d.ts             # Updated types
│   └── app/api/umkm/
│       ├── route.ts              # Updated: GET all UMKM
│       └── [id]/route.ts         # Updated: GET UMKM by ID
└── supabase/
    ├── README.md                 # Dokumentasi lengkap
    ├── schema.sql                # ⭐ Database schema
    └── seed.sql                  # ⭐ Sample data
```

## 🔧 Troubleshooting

### Error: "Missing Supabase environment variables"

**Solusi:**
- Pastikan `.env.local` ada di root project
- Pastikan variable names **persis** seperti di atas (ada prefix `NEXT_PUBLIC_`)
- Restart dev server: `npm run dev`

### Data tidak muncul

**Solusi:**
1. Check di Supabase dashboard → Table Editor → apakah data ada?
2. Check console browser (F12) → apakah ada error?
3. Check console terminal → apakah ada Supabase error?

### Rating tidak ter-update

**Solusi:**
- Triggers sudah otomatis dibuat via schema.sql
- Test dengan insert review baru dan lihat apakah rating berubah

## 📚 Dokumentasi Lengkap

Untuk dokumentasi yang lebih detail, lihat:
- **`supabase/README.md`** - Dokumentasi lengkap dengan ERD, query examples, dll
- **`supabase/schema.sql`** - Struktur database lengkap dengan comments

## 🎯 Next Steps

Setelah setup selesai, kamu bisa:

1. **Tambah data sendiri** via Supabase Table Editor
2. **Modifikasi schema** sesuai kebutuhan
3. **Tambah fitur authentication** untuk user login
4. **Upload images** menggunakan Supabase Storage
5. **Add real-time features** untuk live updates

---

**Butuh bantuan?**
- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
