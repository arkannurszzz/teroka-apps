# 🗄️ Supabase Database Setup - Teroka App

Dokumentasi lengkap untuk setup database Supabase pada project Teroka.

## 📋 Daftar Isi

- [Pengenalan](#pengenalan)
- [Struktur Database](#struktur-database)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Query Examples](#query-examples)

---

## 🎯 Pengenalan

Teroka App menggunakan **Supabase** sebagai backend database. Supabase adalah platform open-source alternative untuk Firebase yang menggunakan PostgreSQL.

**Fitur yang digunakan:**
- PostgreSQL Database
- Row Level Security (RLS)
- Auto-generated API
- Real-time subscriptions (optional)
- Storage untuk images (future)

---

## 🏗️ Struktur Database

### Tabel-tabel

#### 1. **`umkm`** - Tabel Utama UMKM

Menyimpan informasi bisnis UMKM.

| Kolom | Tipe Data | Deskripsi | Constraint |
|-------|-----------|-----------|------------|
| `id` | UUID | Primary key | Auto-generated |
| `created_at` | TIMESTAMP | Waktu dibuat | Auto |
| `updated_at` | TIMESTAMP | Waktu update | Auto (trigger) |
| `name` | VARCHAR(255) | Nama UMKM | NOT NULL |
| `category` | VARCHAR(50) | Kategori | NOT NULL, CHECK |
| `description` | TEXT | Deskripsi bisnis | - |
| `address` | TEXT | Alamat lengkap | NOT NULL |
| `city` | VARCHAR(100) | Kota | NOT NULL |
| `province` | VARCHAR(100) | Provinsi | NOT NULL |
| `latitude` | DECIMAL(10,8) | Koordinat latitude | NOT NULL |
| `longitude` | DECIMAL(11,8) | Koordinat longitude | NOT NULL |
| `contact` | VARCHAR(20) | Nomor telepon | NOT NULL |
| `operating_hours` | VARCHAR(100) | Jam operasional | NOT NULL |
| `image` | TEXT | URL gambar | - |
| `rating` | DECIMAL(3,2) | Rating rata-rata | 0-5, AUTO |
| `owner_name` | VARCHAR(255) | Nama pemilik | - |
| `established_year` | INTEGER | Tahun berdiri | - |
| `employee_count` | INTEGER | Jumlah karyawan | Default: 0 |
| `total_customers` | INTEGER | Total pelanggan | Default: 0 |
| `total_reviews` | INTEGER | Jumlah review | AUTO |
| `is_active` | BOOLEAN | Status aktif | Default: TRUE |

**Categories yang valid:**
- `makanan`
- `minuman`
- `jasa`
- `fashion`
- `lainnya`

#### 2. **`products`** - Produk/Layanan UMKM

Menyimpan produk atau jasa yang ditawarkan oleh UMKM.

| Kolom | Tipe Data | Deskripsi | Constraint |
|-------|-----------|-----------|------------|
| `id` | UUID | Primary key | Auto-generated |
| `created_at` | TIMESTAMP | Waktu dibuat | Auto |
| `updated_at` | TIMESTAMP | Waktu update | Auto (trigger) |
| `umkm_id` | UUID | Foreign key ke umkm | NOT NULL, ON DELETE CASCADE |
| `name` | VARCHAR(255) | Nama produk | NOT NULL |
| `description` | TEXT | Deskripsi produk | - |
| `price` | DECIMAL(12,2) | Harga | NOT NULL, >= 0 |
| `category` | VARCHAR(50) | Kategori produk | - |
| `image` | TEXT | URL gambar | - |
| `is_available` | BOOLEAN | Status tersedia | Default: TRUE |

#### 3. **`reviews`** - Review Pelanggan

Menyimpan review dan rating dari pelanggan.

| Kolom | Tipe Data | Deskripsi | Constraint |
|-------|-----------|-----------|------------|
| `id` | UUID | Primary key | Auto-generated |
| `created_at` | TIMESTAMP | Waktu dibuat | Auto |
| `updated_at` | TIMESTAMP | Waktu update | Auto (trigger) |
| `umkm_id` | UUID | Foreign key ke umkm | NOT NULL, ON DELETE CASCADE |
| `user_name` | VARCHAR(255) | Nama reviewer | NOT NULL |
| `rating` | INTEGER | Rating (1-5) | NOT NULL, CHECK 1-5 |
| `comment` | TEXT | Komentar | - |
| `images` | TEXT[] | Array URL gambar | - |

---

## 🚀 Setup Instructions

### Step 1: Buat Project Supabase

1. Kunjungi [https://supabase.com](https://supabase.com)
2. Sign up / Login
3. Klik **"New Project"**
4. Isi detail project:
   - **Name:** teroka-app
   -  (atau nama lain)
   - **Database Password:** Buat password yang kuat
   - **Region:** Southeast Asia (Singapore) - paling dekat dengan Indonesia
5. Tunggu project selesai dibuat (~2 menit)

### Step 2: Dapatkan API Credentials

1. Di dashboard Supabase, buka **Settings** → **API**
2. Copy informasi berikut:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Setup Environment Variables

1. Buka file `.env.local` di root project
2. Isi dengan credentials dari Step 2:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

### Step 4: Jalankan SQL Schema

1. Di dashboard Supabase, buka **SQL Editor**
2. Klik **"New Query"**
3. Copy paste isi file `supabase/schema.sql`
4. Klik **"Run"** atau tekan `Ctrl + Enter`
5. Pastikan tidak ada error

### Step 5: Inject Seed Data

1. Masih di **SQL Editor**, buat query baru
2. Copy paste isi file `supabase/seed.sql`
3. Klik **"Run"**
4. Verifikasi data sudah masuk:

```sql
SELECT * FROM umkm;
SELECT * FROM products;
SELECT * FROM reviews;
```

### Step 6: Verifikasi Setup

Jalankan query ini untuk memastikan semuanya berjalan dengan baik:

```sql
-- Check total data
SELECT
    (SELECT COUNT(*) FROM umkm) as total_umkm,
    (SELECT COUNT(*) FROM products) as total_products,
    (SELECT COUNT(*) FROM reviews) as total_reviews;

-- Check categories
SELECT category, COUNT(*) as total
FROM umkm
GROUP BY category
ORDER BY total DESC;

-- Check ratings (should be auto-calculated from reviews)
SELECT name, rating, total_reviews
FROM umkm
ORDER BY rating DESC
LIMIT 5;
```

---

## 📊 Database Schema

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│      UMKM       │
├─────────────────┤
│ id (PK)         │
│ name            │
│ category        │
│ description     │
│ address         │
│ city            │
│ province        │
│ latitude        │
│ longitude       │
│ contact         │
│ operating_hours │
│ image           │
│ rating          │ ◄─── Auto-calculated
│ total_reviews   │ ◄─── Auto-calculated
│ is_active       │
└────────┬────────┘
         │
         │ 1:N
         │
    ┌────┴────────────────┬─────────────────┐
    │                     │                 │
┌───▼──────────┐  ┌──────▼────────┐  ┌─────▼────────┐
│   PRODUCTS   │  │    REVIEWS    │  │   (future)   │
├──────────────┤  ├───────────────┤  │              │
│ id (PK)      │  │ id (PK)       │  │   IMAGES     │
│ umkm_id (FK) │  │ umkm_id (FK)  │  │   USERS      │
│ name         │  │ user_name     │  │   ORDERS     │
│ price        │  │ rating        │  │              │
│ description  │  │ comment       │  └──────────────┘
│ is_available │  │ images        │
└──────────────┘  └───────────────┘
```

### Indexes

Database menggunakan indexes untuk performa query yang optimal:

**UMKM Table:**
- `idx_umkm_category` - Filter berdasarkan kategori
- `idx_umkm_city` - Filter berdasarkan kota
- `idx_umkm_province` - Filter berdasarkan provinsi
- `idx_umkm_rating` - Sorting berdasarkan rating
- `idx_umkm_location` - Geospatial queries

**Products Table:**
- `idx_products_umkm_id` - Join dengan UMKM
- `idx_products_category` - Filter kategori produk

**Reviews Table:**
- `idx_reviews_umkm_id` - Join dengan UMKM
- `idx_reviews_rating` - Filter/sort rating
- `idx_reviews_created_at` - Sort by date

### Triggers & Functions

#### 1. **Auto Update Timestamp**

Trigger `set_updated_at_*` pada semua tabel untuk otomatis update kolom `updated_at`.

```sql
-- Trigger otomatis update kolom updated_at
CREATE TRIGGER set_updated_at_umkm
    BEFORE UPDATE ON public.umkm
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
```

#### 2. **Auto Calculate Rating**

Trigger `update_rating_on_review_*` untuk otomatis menghitung rating dan total reviews.

```sql
-- Setiap ada INSERT/UPDATE/DELETE review:
-- - Rating di-calculate ulang (average)
-- - total_reviews di-update
CREATE TRIGGER update_rating_on_review_insert
    AFTER INSERT ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_umkm_rating();
```

**Contoh:**
- User tambah review dengan rating 5
- Otomatis rating UMKM ter-update jadi average dari semua reviews
- Otomatis total_reviews bertambah 1

---

## 🔐 Row Level Security (RLS)

RLS sudah diaktifkan dengan policies berikut:

### Read Policies (SELECT)
- ✅ Semua user bisa lihat UMKM yang `is_active = TRUE`
- ✅ Semua user bisa lihat produk yang `is_available = TRUE`
- ✅ Semua user bisa lihat semua reviews

### Write Policies (INSERT/UPDATE)
- ⚠️ **Saat ini:** Semua user bisa INSERT/UPDATE (untuk development)
- 🔒 **Production:** Harus ditambahkan authentication dan dibatasi hanya admin/owner yang bisa edit

**Cara update policy untuk production:**

```sql
-- Hapus policy development
DROP POLICY "Enable insert for all users" ON public.umkm;

-- Tambah policy yang lebih ketat
CREATE POLICY "Enable insert for authenticated users" ON public.umkm
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() IS NOT NULL);
```

---

## ⚙️ Environment Variables

### Required Variables

File: `.env.local`

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Cara mendapatkan nilai:

1. **NEXT_PUBLIC_SUPABASE_URL:**
   - Dashboard → Settings → API → Project URL

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY:**
   - Dashboard → Settings → API → Project API keys → `anon` `public`

⚠️ **Catatan:**
- `NEXT_PUBLIC_*` berarti variable akan exposed ke client-side
- `anon` key aman untuk client karena dilindungi RLS
- Jangan pernah expose `service_role` key ke client!

---

## 🔍 Query Examples

### Mendapatkan Semua UMKM

```sql
SELECT * FROM umkm
WHERE is_active = TRUE
ORDER BY rating DESC;
```

### Filter UMKM by Category

```sql
SELECT * FROM umkm
WHERE category = 'makanan'
  AND is_active = TRUE
ORDER BY rating DESC;
```

### Search UMKM by Name or City

```sql
SELECT * FROM umkm
WHERE (
    LOWER(name) LIKE '%bakso%'
    OR LOWER(city) LIKE '%bandung%'
)
AND is_active = TRUE;
```

### Get UMKM with Products

```sql
SELECT
    u.*,
    json_agg(
        json_build_object(
            'id', p.id,
            'name', p.name,
            'price', p.price,
            'image', p.image
        )
    ) as products
FROM umkm u
LEFT JOIN products p ON u.id = p.umkm_id AND p.is_available = TRUE
WHERE u.is_active = TRUE
GROUP BY u.id;
```

### Get UMKM with Reviews

```sql
SELECT
    u.id,
    u.name,
    u.rating,
    u.total_reviews,
    json_agg(
        json_build_object(
            'user_name', r.user_name,
            'rating', r.rating,
            'comment', r.comment,
            'created_at', r.created_at
        )
        ORDER BY r.created_at DESC
    ) as reviews
FROM umkm u
LEFT JOIN reviews r ON u.id = r.umkm_id
WHERE u.id = '00000000-0000-0000-0000-000000000001'
GROUP BY u.id;
```

### Find Nearby UMKM (by coordinates)

```sql
-- Menggunakan Haversine formula untuk mencari UMKM terdekat
SELECT
    *,
    (
        6371 * acos(
            cos(radians(-6.2088)) * cos(radians(latitude)) *
            cos(radians(longitude) - radians(106.8456)) +
            sin(radians(-6.2088)) * sin(radians(latitude))
        )
    ) AS distance_km
FROM umkm
WHERE is_active = TRUE
ORDER BY distance_km
LIMIT 10;
```

### Get Statistics

```sql
-- Total UMKM per kategori
SELECT
    category,
    COUNT(*) as total,
    ROUND(AVG(rating)::numeric, 2) as avg_rating
FROM umkm
WHERE is_active = TRUE
GROUP BY category
ORDER BY total DESC;

-- Top rated UMKM
SELECT name, category, rating, total_reviews
FROM umkm
WHERE is_active = TRUE AND total_reviews >= 3
ORDER BY rating DESC, total_reviews DESC
LIMIT 10;

-- Most reviewed UMKM
SELECT name, category, total_reviews, rating
FROM umkm
WHERE is_active = TRUE
ORDER BY total_reviews DESC
LIMIT 10;
```

---

## 🛠️ Troubleshooting

### Error: "Missing Supabase environment variables"

**Solusi:**
1. Pastikan file `.env.local` ada di root project
2. Pastikan variable names benar (harus ada `NEXT_PUBLIC_` prefix)
3. Restart development server: `npm run dev`

### Error: "relation does not exist"

**Solusi:**
1. Pastikan sudah run `schema.sql` di SQL Editor
2. Check apakah table sudah dibuat: `SELECT * FROM pg_tables WHERE schemaname = 'public';`

### Data tidak muncul di frontend

**Solusi:**
1. Check RLS policies: `SELECT * FROM pg_policies;`
2. Pastikan data `is_active = TRUE`
3. Check di Supabase Dashboard → Table Editor

### Rating tidak ter-update otomatis

**Solusi:**
1. Pastikan trigger sudah dibuat: `SELECT * FROM pg_trigger;`
2. Test manual update review dan check apakah rating berubah

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 📝 Notes

- Database menggunakan **UUID** sebagai primary key untuk keamanan dan scalability
- **Timestamps** otomatis di-handle oleh database (created_at, updated_at)
- **Rating calculation** dilakukan otomatis via triggers
- **RLS** untuk production harus dikonfigurasi dengan authentication
- **Indexes** sudah dioptimalkan untuk query yang sering digunakan

---

**Last Updated:** 2025-01-09
**Version:** 1.0.0
