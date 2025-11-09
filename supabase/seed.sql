-- ============================================================================
-- TEROKA APP - SUPABASE SEED DATA
-- ============================================================================
-- Description: Sample data for testing and development
-- Created: 2025-01-09
-- Updated: 2025-01-09 - Added complete products and reviews for all UMKM
-- ============================================================================

-- Clear existing data (be careful in production!)
TRUNCATE TABLE public.reviews CASCADE;
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.umkm CASCADE;

-- ============================================================================
-- SEED DATA: UMKM
-- ============================================================================

INSERT INTO public.umkm (
    id,
    name,
    category,
    description,
    address,
    city,
    province,
    latitude,
    longitude,
    contact,
    operating_hours,
    rating,
    owner_name,
    established_year,
    employee_count,
    total_customers,
    image,
    is_active
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'Warung Nasi Bu Ani',
    'makanan',
    'Warung nasi dengan berbagai pilihan lauk pauk tradisional Indonesia. Menyajikan nasi rames dengan lauk pilihan seperti ayam goreng, tempe, tahu, dan sayur-sayuran segar. Cocok untuk makan siang atau makan malam.',
    'Jl. Merdeka No. 123',
    'Jakarta',
    'DKI Jakarta',
    -6.2088,
    106.8456,
    '+62812345678',
    '08:00-21:00',
    4.5,
    'Bu Ani',
    2015,
    5,
    1200,
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000002',
    'Bengkel Maju Jaya',
    'jasa',
    'Bengkel kendaraan profesional yang melayani service motor dan mobil. Teknisi berpengalaman dengan peralatan modern. Melayani servis rutin, perbaikan mesin, ganti oli, dan perawatan berkala.',
    'Jl. Industri No. 45',
    'Bandung',
    'Jawa Barat',
    -6.9175,
    107.6191,
    '+62898765432',
    '09:00-18:00',
    4.2,
    'Pak Jaya',
    2010,
    8,
    3500,
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000003',
    'Toko Kue Nyonya',
    'makanan',
    'Toko kue spesialis kue tradisional dan modern. Menyediakan berbagai macam kue basah dan kue kering untuk berbagai acara. Bisa melayani pesanan dalam jumlah besar untuk acara special.',
    'Jl. Sudirman No. 78',
    'Surabaya',
    'Jawa Timur',
    -7.2575,
    112.7521,
    '+62811223344',
    '07:00-20:00',
    4.8,
    'Nyonya Lim',
    2012,
    6,
    2800,
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000004',
    'Kedai Kopi Santai',
    'minuman',
    'Kedai kopi modern dengan suasana santai dan nyaman. Menyajikan berbagai jenis kopi nusantara dan international. Tempat yang cocok untuk ngobrol, kerja, atau sekadar bersantai sambil menikmati kopi berkualitas.',
    'Jl. Gatot Subroto No. 88',
    'Yogyakarta',
    'DI Yogyakarta',
    -7.7956,
    110.3695,
    '+62877665544',
    '10:00-22:00',
    4.6,
    'Mas Budi',
    2018,
    4,
    1500,
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000005',
    'Butik Cantik Modis',
    'fashion',
    'Butik fashion wanita dengan koleksi pakaian trendy dan stylish. Menyediakan dress, blouse, celana, dan aksesori fashion terkini. Harga terjangkau dengan kualitas premium.',
    'Jl. Malioboro No. 200',
    'Yogyakarta',
    'DI Yogyakarta',
    -7.7926,
    110.3656,
    '+62822334455',
    '09:00-21:00',
    4.3,
    'Ibu Siti',
    2016,
    3,
    950,
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000006',
    'Laundry Express 24',
    'jasa',
    'Layanan laundry cepat dan berkualitas dengan sistem express 24 jam. Melayani cuci setrika pakaian, cuci sepatu, cuci karpet, dan cuci boneka. Menggunakan deterjen ramah lingkungan.',
    'Jl. Ahmad Yani No. 56',
    'Semarang',
    'Jawa Tengah',
    -6.9932,
    110.4203,
    '+62856776655',
    '06:00-22:00',
    4.4,
    'Pak Andi',
    2019,
    7,
    2100,
    'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000007',
    'Bakso Mercon Pak Kumis',
    'makanan',
    'Warung bakso legendaris dengan cita rasa pedas yang menggugah selera. Bakso sapi pilihan dengan kuah kaldu yang gurih. Tersedia level kepedasan dari level 1 hingga level 10 (mercon).',
    'Jl. Pahlawan No. 34',
    'Malang',
    'Jawa Timur',
    -7.9666,
    112.6326,
    '+62833445566',
    '10:00-22:00',
    4.7,
    'Pak Kumis',
    2008,
    4,
    3200,
    'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000008',
    'Jus Segar Barokah',
    'minuman',
    'Kedai jus dan minuman segar dengan berbagai pilihan buah lokal dan impor. Tanpa pengawet, tanpa pemanis buatan. Menu favorit: jus alpukat, mangga, strawberry, dan mix juice.',
    'Jl. Diponegoro No. 99',
    'Solo',
    'Jawa Tengah',
    -7.5705,
    110.8280,
    '+62866778899',
    '08:00-20:00',
    4.5,
    'Bu Barokah',
    2017,
    3,
    1800,
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000009',
    'Salon Rambut Indah',
    'jasa',
    'Salon kecantikan profesional untuk pria dan wanita. Melayani potong rambut, cat rambut, smoothing, rebonding, creambath, dan treatment rambut lainnya. Hairstylist berpengalaman dan ramah.',
    'Jl. Imam Bonjol No. 77',
    'Medan',
    'Sumatera Utara',
    3.5952,
    98.6722,
    '+62899887766',
    '09:00-19:00',
    4.6,
    'Ibu Indah',
    2014,
    5,
    2500,
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000010',
    'Distro Kaos Original',
    'fashion',
    'Distro yang menjual kaos original dengan desain unik dan limited edition. Bahan berkualitas, sablon tidak mudah luntur. Cocok untuk anak muda yang ingin tampil beda dan stylish.',
    'Jl. Cihampelas No. 125',
    'Bandung',
    'Jawa Barat',
    -6.8915,
    107.6107,
    '+62844556677',
    '10:00-21:00',
    4.4,
    'Mas Dika',
    2020,
    4,
    1100,
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    TRUE
);

-- ============================================================================
-- SEED DATA: PRODUCTS
-- ============================================================================

INSERT INTO public.products (
    umkm_id,
    name,
    description,
    price,
    category,
    image,
    is_available
) VALUES
-- Products for Warung Nasi Bu Ani (Makanan)
('00000000-0000-0000-0000-000000000001', 'Nasi Rames Ayam', 'Nasi dengan ayam goreng, tempe, tahu, dan sayur', 18000, 'makanan', 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400', TRUE),
('00000000-0000-0000-0000-000000000001', 'Nasi Rames Ikan', 'Nasi dengan ikan goreng, sambal, dan lalapan', 20000, 'makanan', 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400', TRUE),
('00000000-0000-0000-0000-000000000001', 'Nasi Rames Telur', 'Nasi dengan telur dadar, tempe, tahu, dan sayur', 15000, 'makanan', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400', TRUE),
('00000000-0000-0000-0000-000000000001', 'Es Teh Manis', 'Es teh manis segar', 3000, 'minuman', NULL, TRUE),
('00000000-0000-0000-0000-000000000001', 'Es Jeruk', 'Es jeruk peras segar', 5000, 'minuman', NULL, TRUE),

-- Products for Bengkel Maju Jaya (Jasa)
('00000000-0000-0000-0000-000000000002', 'Service Rutin Motor', 'Service berkala motor, termasuk ganti oli dan filter', 75000, 'jasa', 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400', TRUE),
('00000000-0000-0000-0000-000000000002', 'Service Rutin Mobil', 'Service berkala mobil, termasuk tune up dan cek mesin', 350000, 'jasa', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', TRUE),
('00000000-0000-0000-0000-000000000002', 'Ganti Oli Motor', 'Ganti oli mesin motor dengan oli berkualitas', 50000, 'jasa', NULL, TRUE),
('00000000-0000-0000-0000-000000000002', 'Perbaikan Rem', 'Perbaikan sistem rem motor dan mobil', 150000, 'jasa', NULL, TRUE),

-- Products for Toko Kue Nyonya (Makanan)
('00000000-0000-0000-0000-000000000003', 'Kue Lapis Legit', 'Kue lapis legit premium dengan butter import', 150000, 'kue', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', TRUE),
('00000000-0000-0000-0000-000000000003', 'Nastar Premium', 'Nastar dengan selai nanas pilihan (1 toples)', 75000, 'kue', 'https://images.unsplash.com/photo-1577508337793-050d0b3b9a92?w=400', TRUE),
('00000000-0000-0000-0000-000000000003', 'Kue Kering Mix', 'Paket kue kering assorted (1 toples)', 85000, 'kue', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', TRUE),
('00000000-0000-0000-0000-000000000003', 'Brownies Kukus', 'Brownies kukus lembut coklat dan pandan', 45000, 'kue', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400', TRUE),
('00000000-0000-0000-0000-000000000003', 'Bolu Gulung', 'Bolu gulung isi selai berbagai rasa', 40000, 'kue', NULL, TRUE),

-- Products for Kedai Kopi Santai (Minuman)
('00000000-0000-0000-0000-000000000004', 'Kopi Gayo', 'Single origin kopi dari Aceh', 25000, 'kopi', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', TRUE),
('00000000-0000-0000-0000-000000000004', 'Kopi Toraja', 'Single origin kopi dari Sulawesi', 25000, 'kopi', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', TRUE),
('00000000-0000-0000-0000-000000000004', 'Cappuccino', 'Cappuccino dengan latte art', 22000, 'kopi', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', TRUE),
('00000000-0000-0000-0000-000000000004', 'Es Kopi Susu', 'Es kopi susu kekinian', 20000, 'kopi', NULL, TRUE),
('00000000-0000-0000-0000-000000000004', 'Matcha Latte', 'Matcha latte premium', 28000, 'minuman', NULL, TRUE),

-- Products for Butik Cantik Modis (Fashion)
('00000000-0000-0000-0000-000000000005', 'Dress Casual Korea', 'Dress casual dengan model Korea terkini', 189000, 'fashion', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', TRUE),
('00000000-0000-0000-0000-000000000005', 'Blouse Kerja Premium', 'Blouse untuk kerja kantoran, bahan nyaman', 149000, 'fashion', 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400', TRUE),
('00000000-0000-0000-0000-000000000005', 'Celana Kulot', 'Celana kulot trendy untuk wanita', 129000, 'fashion', 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400', TRUE),
('00000000-0000-0000-0000-000000000005', 'Outer Cardigan', 'Cardigan outer untuk layering', 99000, 'fashion', NULL, TRUE),
('00000000-0000-0000-0000-000000000005', 'Set Hijab', 'Set hijab instan dengan bros', 75000, 'fashion', NULL, TRUE),

-- Products for Laundry Express 24 (Jasa)
('00000000-0000-0000-0000-000000000006', 'Cuci Setrika Kiloan', 'Cuci dan setrika pakaian per kilogram', 8000, 'jasa', 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400', TRUE),
('00000000-0000-0000-0000-000000000006', 'Cuci Sepatu', 'Cuci bersih sepatu segala jenis', 25000, 'jasa', 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=400', TRUE),
('00000000-0000-0000-0000-000000000006', 'Cuci Karpet', 'Cuci karpet ukuran sedang', 50000, 'jasa', NULL, TRUE),
('00000000-0000-0000-0000-000000000006', 'Dry Cleaning', 'Dry cleaning untuk pakaian formal', 35000, 'jasa', NULL, TRUE),

-- Products for Bakso Mercon Pak Kumis (Makanan)
('00000000-0000-0000-0000-000000000007', 'Bakso Mercon Level 5', 'Bakso pedas level menengah', 15000, 'makanan', 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400', TRUE),
('00000000-0000-0000-0000-000000000007', 'Bakso Mercon Level 10', 'Bakso super pedas untuk yang berani', 15000, 'makanan', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400', TRUE),
('00000000-0000-0000-0000-000000000007', 'Bakso Urat Jumbo', 'Bakso urat ukuran jumbo', 18000, 'makanan', NULL, TRUE),
('00000000-0000-0000-0000-000000000007', 'Bakso Original', 'Bakso biasa tanpa pedas', 12000, 'makanan', NULL, TRUE),
('00000000-0000-0000-0000-000000000007', 'Mie Ayam', 'Mie ayam dengan topping ayam', 13000, 'makanan', NULL, TRUE),

-- Products for Jus Segar Barokah (Minuman)
('00000000-0000-0000-0000-000000000008', 'Jus Alpukat', 'Jus alpukat segar tanpa gula tambahan', 12000, 'minuman', 'https://images.unsplash.com/photo-1568388047-6d4b0d87a410?w=400', TRUE),
('00000000-0000-0000-0000-000000000008', 'Jus Mangga', 'Jus mangga manis segar', 10000, 'minuman', 'https://images.unsplash.com/photo-1605027990121-cbae9d39b120?w=400', TRUE),
('00000000-0000-0000-0000-000000000008', 'Jus Strawberry', 'Jus strawberry segar', 15000, 'minuman', 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400', TRUE),
('00000000-0000-0000-0000-000000000008', 'Mix Juice', 'Kombinasi berbagai buah segar', 15000, 'minuman', NULL, TRUE),
('00000000-0000-0000-0000-000000000008', 'Jus Jeruk', 'Jus jeruk peras segar', 8000, 'minuman', NULL, TRUE),

-- Products for Salon Rambut Indah (Jasa)
('00000000-0000-0000-0000-000000000009', 'Potong Rambut Pria', 'Potong rambut untuk pria dengan styling', 35000, 'jasa', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400', TRUE),
('00000000-0000-0000-0000-000000000009', 'Potong Rambut Wanita', 'Potong rambut untuk wanita dengan styling', 50000, 'jasa', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', TRUE),
('00000000-0000-0000-0000-000000000009', 'Smoothing Rambut', 'Smoothing rambut untuk tampilan sleek', 350000, 'jasa', NULL, TRUE),
('00000000-0000-0000-0000-000000000009', 'Cat Rambut', 'Pewarnaan rambut dengan cat import', 250000, 'jasa', NULL, TRUE),
('00000000-0000-0000-0000-000000000009', 'Creambath', 'Creambath untuk perawatan rambut', 75000, 'jasa', NULL, TRUE),

-- Products for Distro Kaos Original (Fashion)
('00000000-0000-0000-0000-000000000010', 'Kaos Distro Limited Edition', 'Kaos dengan desain eksklusif limited edition', 125000, 'fashion', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', TRUE),
('00000000-0000-0000-0000-000000000010', 'Kaos Polos Premium', 'Kaos polos dengan bahan cotton combed 30s', 85000, 'fashion', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400', TRUE),
('00000000-0000-0000-0000-000000000010', 'Kaos Band Local', 'Kaos dengan desain band lokal', 110000, 'fashion', NULL, TRUE),
('00000000-0000-0000-0000-000000000010', 'Hoodie Premium', 'Hoodie dengan sablon berkualitas', 185000, 'fashion', NULL, TRUE);

-- ============================================================================
-- SEED DATA: REVIEWS
-- ============================================================================

INSERT INTO public.reviews (
    umkm_id,
    user_name,
    rating,
    comment,
    images
) VALUES
-- Reviews for Warung Nasi Bu Ani
('00000000-0000-0000-0000-000000000001', 'Ahmad Rizki', 5, 'Makanannya enak banget! Porsi besar dan harga terjangkau. Langganan tiap hari!', NULL),
('00000000-0000-0000-0000-000000000001', 'Siti Nurhaliza', 4, 'Nasi ramesnya mantap, cuma kadang harus antri agak lama kalau jam makan siang.', NULL),
('00000000-0000-0000-0000-000000000001', 'Budi Santoso', 5, 'Rasanya mirip masakan rumah, nagih! Ayam gorengnya crispy banget.', NULL),
('00000000-0000-0000-0000-000000000001', 'Rina Susanti', 4, 'Enak dan murah. Tempe gorengnya renyah. Recommended!', NULL),

-- Reviews for Bengkel Maju Jaya
('00000000-0000-0000-0000-000000000002', 'Andi Pratama', 4, 'Servicenya cepat dan harga reasonable. Mekaniknya jujur dan terpercaya.', NULL),
('00000000-0000-0000-0000-000000000002', 'Dewi Lestari', 5, 'Bengkel langganan saya. Pelayanan ramah dan hasil kerja bagus.', NULL),
('00000000-0000-0000-0000-000000000002', 'Eko Prasetyo', 4, 'Recommended! Udah langganan 3 tahun disini. Harga transparan.', NULL),
('00000000-0000-0000-0000-000000000002', 'Fajar Rahman', 4, 'Mekaniknya skilled, dijelasin juga bagian mana yang rusak.', NULL),

-- Reviews for Toko Kue Nyonya
('00000000-0000-0000-0000-000000000003', 'Linda Wijaya', 5, 'Kue lapisnya juara! Lembuuut banget dan gak terlalu manis. Perfect!', NULL),
('00000000-0000-0000-0000-000000000003', 'Rudi Hermawan', 5, 'Nastarnya enak banget, selainya pas. Harga emang agak mahal tapi worth it!', NULL),
('00000000-0000-0000-0000-000000000003', 'Maya Putri', 4, 'Kue keringnya enak, cuma wishlist bisa pesan satuan bukan satu toples.', NULL),
('00000000-0000-0000-0000-000000000003', 'Hendra Gunawan', 5, 'Bolu gulungnya enak banget! Lembut dan isinya banyak.', NULL),
('00000000-0000-0000-0000-000000000003', 'Tini Kusuma', 5, 'Brownies kususnya recommended! Teksturnya pas, gak terlalu manis.', NULL),

-- Reviews for Kedai Kopi Santai
('00000000-0000-0000-0000-000000000004', 'Farhan Maulana', 5, 'Tempatnya cozy, kopinya mantap. Cocok buat kerja atau nongkrong.', NULL),
('00000000-0000-0000-0000-000000000004', 'Ayu Kartika', 4, 'Kopi Gayonya recommended! Suasana tenang, wifi kenceng.', NULL),
('00000000-0000-0000-0000-000000000004', 'Dimas Aji', 5, 'Kopi terenak di Jogja! Baristanya juga ramah dan bisa ngobrol.', NULL),
('00000000-0000-0000-0000-000000000004', 'Putri Amelia', 5, 'Cappuccinonya enak, latte artnya bagus. Instagramable!', NULL),
('00000000-0000-0000-0000-000000000004', 'Yoga Pratama', 4, 'Es kopi susunya mantap! Harga standard coffee shop.', NULL),

-- Reviews for Butik Cantik Modis
('00000000-0000-0000-0000-000000000005', 'Sarah Melinda', 5, 'Dress-dressnya cantik dan trendy! Bahannya juga bagus, ga murahan.', NULL),
('00000000-0000-0000-0000-000000000005', 'Novi Anggraeni', 4, 'Koleksinya selalu update. Harga worth it dengan kualitas. Recommended!', NULL),
('00000000-0000-0000-0000-000000000005', 'Lia Permata', 4, 'Blouse kerjanya cocok banget buat formal. Nyaman dipake seharian.', NULL),
('00000000-0000-0000-0000-000000000005', 'Dina Mariana', 5, 'Pelayanannya ramah, bisa request model. Kualitas jahitan rapih.', NULL),

-- Reviews for Laundry Express 24
('00000000-0000-0000-0000-000000000006', 'Arif Budiman', 4, 'Cepet banget, sehari jadi. Wangi dan rapih. Harga ok.', NULL),
('00000000-0000-0000-0000-000000000006', 'Wulan Sari', 5, 'Cuci sepatu di sini hasilnya bagus banget! Bersih kayak baru.', NULL),
('00000000-0000-0000-0000-000000000006', 'Budi Setiawan', 4, 'Laundry langganan. Express 24 jam beneran cepet, cocok untuk yang sibuk.', NULL),
('00000000-0000-0000-0000-000000000006', 'Sinta Dewi', 5, 'Puas banget! Pakaiannya wangi, setrikaan rapih. Recommended!', NULL),

-- Reviews for Bakso Mercon Pak Kumis
('00000000-0000-0000-0000-000000000007', 'Yoga Pratama', 5, 'Pedasnya nampol! Level 10 bener-bener mercon, tapi nagih banget!', NULL),
('00000000-0000-0000-0000-000000000007', 'Rina Anggraini', 4, 'Baksonya enak, kuahnya gurih. Cuma kalau gak kuat pedas jangan level tinggi.', NULL),
('00000000-0000-0000-0000-000000000007', 'Hendra Gunawan', 5, 'Bakso legendaris! Udah makan disini dari jaman SMP. Tetep enak!', NULL),
('00000000-0000-0000-0000-000000000007', 'Deni Setiawan', 5, 'Bakso uratnya kenyal, kuahnya sedap. Level 5 udah pas buat saya.', NULL),
('00000000-0000-0000-0000-000000000007', 'Maya Lestari', 4, 'Enak banget! Cuma antrinya kadang lama. Tapi worth the wait!', NULL),

-- Reviews for Jus Segar Barokah
('00000000-0000-0000-0000-000000000008', 'Putri Rahayu', 5, 'Jusnya seger banget, buahnya fresh. Harga juga terjangkau.', NULL),
('00000000-0000-0000-0000-000000000008', 'Irfan Hakim', 4, 'Jus alpukatnya mantap, gak terlalu manis. Pas banget!', NULL),
('00000000-0000-0000-0000-000000000008', 'Ani Susanti', 5, 'Mix juicenya enak, kombinasi buahnya pas. Seger!', NULL),
('00000000-0000-0000-0000-000000000008', 'Rudi Hartono', 4, 'Jus strawberrynya fresh dan manis. Recommended untuk yang suka buah.', NULL),

-- Reviews for Salon Rambut Indah
('00000000-0000-0000-0000-000000000009', 'Wulan Sari', 5, 'Hasil smoothingnya awet dan rapi. Bu Indah orangnya profesional.', NULL),
('00000000-0000-0000-0000-000000000009', 'Tono Suryanto', 4, 'Potong rambutnya rapih, harga standard salon biasa. Pelayanan oke.', NULL),
('00000000-0000-0000-0000-000000000009', 'Sinta Dewi', 5, 'Salon langganan sejak 2020! Puas terus sama hasilnya.', NULL),
('00000000-0000-0000-0000-000000000009', 'Lia Permata', 5, 'Cat rambutnya bagus, warnanya sesuai request. Hairstylistnya skilled!', NULL),
('00000000-0000-0000-0000-000000000009', 'Andi Wijaya', 4, 'Creambathnya enak, relax banget. Hasil rambutnya jadi lembut.', NULL),

-- Reviews for Distro Kaos Original
('00000000-0000-0000-0000-000000000010', 'Rizal Firmansyah', 4, 'Kaosnya keren-keren, bahannya juga bagus. Limited edition jadi gak pasaran.', NULL),
('00000000-0000-0000-0000-000000000010', 'Dina Mariana', 5, 'Desainnya unik-unik! Kualitas printing bagus, gak gampang luntur.', NULL),
('00000000-0000-0000-0000-000000000010', 'Eko Saputra', 4, 'Kaos polosnya nyaman dipake. Bahannya adem dan gak gampang melar.', NULL),
('00000000-0000-0000-0000-000000000010', 'Fajar Muhammad', 5, 'Hoodienya keren! Sablon rapih dan bahannya tebal. Worth the price!', NULL);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these queries to verify the data has been inserted correctly

-- Check UMKM count by category
-- SELECT category, COUNT(*) as total FROM public.umkm GROUP BY category ORDER BY total DESC;

-- Check products count by UMKM
-- SELECT u.name, COUNT(p.id) as product_count FROM public.umkm u
-- LEFT JOIN public.products p ON u.id = p.umkm_id
-- GROUP BY u.name ORDER BY product_count DESC;

-- Check reviews count by UMKM
-- SELECT u.name, COUNT(r.id) as review_count FROM public.umkm u
-- LEFT JOIN public.reviews r ON u.id = r.umkm_id
-- GROUP BY u.name ORDER BY review_count DESC;

-- Verify triggers are working (ratings should be auto-calculated)
-- SELECT u.name, u.rating, ROUND(AVG(r.rating)::numeric, 2) as calculated_rating
-- FROM public.umkm u
-- LEFT JOIN public.reviews r ON u.id = r.umkm_id
-- GROUP BY u.id, u.name, u.rating;

-- Check total data
-- SELECT
--   (SELECT COUNT(*) FROM public.umkm) as total_umkm,
--   (SELECT COUNT(*) FROM public.products) as total_products,
--   (SELECT COUNT(*) FROM public.reviews) as total_reviews;
