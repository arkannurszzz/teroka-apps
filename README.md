# Teroka App - Direktori UMKM Indonesia

> 🇮🇩 Platform modern untuk eksplorasi dan pendaftaran UMKM lokal di Indonesia
> 🚀 Tech stack: **Next.js 16 + TypeScript + Tailwind CSS + Supabase + App Router**

---

## 📖 Tentang Teroka

Teroka adalah aplikasi web modern yang menghubungkan konsumen dengan UMKM (Usaha Mikro, Kecil, dan Menengah) lokal di seluruh Indonesia. Platform ini dirancang untuk memudahkan pencarian dan pendaftaran UMKM dengan user experience yang intuitif dan modern.

### 🎯 Fitur Utama

#### 🔍 **Pencarian UMKM**
- Pencarian berdasarkan nama, kategori, dan lokasi
- Filter kategori: Makanan, Minuman, Jasa, Fashion, Lainnya
- Integrasi Google Maps untuk lokasi-based search
- Responsive grid layout dengan animasi smooth

#### 📝 **Pendaftaran UMKM Multi-Step**
- Form pendaftaran bertahap yang user-friendly
- Upload gambar dan produk unggulan
- Informasi kontak dan lokasi lengkap
- Progress indicator untuk tracking

#### 🏪 **Detail UMKM Komprehensif**
- Informasi lengkap UMKM (deskripsi, kontak, lokasi)
- Gallery produk dan layanan
- Sistem review dan rating
- Embed Google Maps integrasi

#### 👨‍💼 **Admin Panel**
- Dashboard untuk mengelola UMKM
- CRUD operations untuk data UMKM
- Management produk dan review
- Analytics dan monitoring

#### 🎨 **Modern UI/UX**
- Responsive design untuk semua device
- Smooth animations dengan Framer Motion
- Modern components dengan shadcn/ui
- Performance optimized dengan Next.js 16

---

## 🏗️ Arsitektur Teknologi

### Frontend Stack
- **Next.js 16.0.1** - React framework dengan App Router
- **React 19.2.0** - UI library modern
- **TypeScript** - Static type checking untuk code quality
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components

### Backend & Database
- **Supabase** - Backend-as-a-Service (BaaS)
- **PostgreSQL** - Database engine
- **Row Level Security (RLS)** - Security policies
- **Supabase Storage** - File storage untuk gambar

### Integrasi External
- **Google Maps API** - Maps dan location services
- **Google Geocoding** - Location data processing
- **Supabase Auth** - Authentication system

### Development Tools
- **ESLint + TypeScript ESLint** - Code linting dan quality
- **PostCSS** - CSS post-processing
- **Turbopack** - Fast development build tool

---

## 📁 Struktur Project

```
teroka-apps/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── umkm/                # UMKM CRUD operations
│   │   │   ├── products/             # Products management
│   │   │   ├── reviews/              # Reviews management
│   │   │   ├── upload/               # File upload handler
│   │   │   ├── cleanup-images/       # Image cleanup utility
│   │   │   └── setup-storage/        # Storage initialization
│   │   ├── admin/                    # Admin panel pages
│   │   │   └── page.tsx             # Admin dashboard
│   │   ├── search/                   # Search functionality
│   │   │   └── page.tsx             # Main search page
│   │   ├── register/                 # Registration flow
│   │   │   └── page.tsx             # Multi-step registration
│   │   ├── umkm/                     # UMKM pages
│   │   │   └── [id]/                # Dynamic UMKM detail
│   │   │       └── page.tsx         # Detail UMKM page
│   │   ├── layout.tsx               # Root layout component
│   │   ├── page.tsx                 # Landing page
│   │   └── middleware.ts           # Next.js middleware
│   ├── components/                   # Reusable components
│   │   ├── layout/                  # Layout components
│   │   │   ├── SiteHeaderNavbar.tsx # Navigation header
│   │   │   └── SiteFooter.tsx       # Footer component
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx          # Button component
│   │   │   ├── card.tsx            # Card component
│   │   │   ├── input.tsx           # Input component
│   │   │   └── container.tsx       # Container wrapper
│   │   ├── shared/                  # Shared business components
│   │   │   ├── UmkmCard.tsx        # UMKM display card
│   │   │   ├── SearchBar.tsx       # Search functionality
│   │   │   ├── SectionTitle.tsx    # Section headers
│   │   │   └── GoogleMapsEmbed.tsx # Maps integration
│   │   └── effects/                 # Animation components
│   │       ├── FadeIn.tsx          # Fade in animation
│   │       └── SlideUp.tsx         # Slide up animation
│   ├── features/                    # Feature-based components
│   │   ├── landing/                 # Landing page components
│   │   │   ├── Hero.tsx            # Hero section
│   │   │   ├── Option.tsx          # Feature options
│   │   │   ├── Marquee.tsx         # Marquee animation
│   │   │   └── RotatingHeadline.tsx # Dynamic headlines
│   │   ├── register/                # Registration components
│   │   │   ├── RegisterPage.tsx    # Main registration page
│   │   │   ├── ContactSection.tsx  # Contact information
│   │   │   ├── LocationSection.tsx # Location data
│   │   │   ├── AdditionalInfoSection.tsx # Additional info
│   │   │   └── FeaturedProductsSection.tsx # Products upload
│   │   ├── search/                  # Search page components
│   │   │   ├── Hero.tsx            # Search hero section
│   │   │   ├── Results.tsx         # Search results with pagination
│   │   │   ├── CategoryTabs.tsx    # Category filters
│   │   │   ├── FaqCompact.tsx      # FAQ section
│   │   │   └── WhyTeroka.tsx       # Feature highlights
│   │   ├── umkm/                    # UMKM page components
│   │   │   ├── UmkmDetail.tsx      # Main detail page
│   │   │   ├── UmkmHeader.tsx      # Header section
│   │   │   ├── UmkmInfo.tsx        # Information section
│   │   │   ├── UmkmProducts.tsx    # Products gallery
│   │   │   └── UmkmReviews.tsx     # Reviews section
│   │   └── admin/                   # Admin components
│   │       ├── AdminUmkmPage.tsx   # Admin UMKM management
│   │       └── AdminLayout.tsx     # Admin layout
│   ├── hooks/                       # Custom React hooks
│   │   ├── useFetch.ts             # Data fetching hook
│   │   └── useWilayah.ts           # Location data hook
│   ├── lib/                        # Utility libraries
│   │   ├── supabase.ts             # Supabase client
│   │   └── utils.ts                # General utilities
│   ├── types/                      # TypeScript definitions
│   │   ├── umkm.d.ts               # UMKM type definitions
│   │   └── supabase.d.ts           # Supabase types
│   └── constants/                   # Application constants
│       └── appConfig.ts            # App configuration
├── public/                         # Static assets
│   └── images/                     # Images and media
│       ├── landing/                # Landing page assets
│       ├── search/                 # Search page assets
│       ├── umkm/                   # UMKM images
│       └── logos/                  # Logo and branding
├── supabase/                       # Database schemas
│   ├── schema.sql                  # Database schema
│   └── seed.sql                    # Seed data
├── .env.example                    # Environment variables template
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS config
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies and scripts
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn
- Git

### Installation

1. **Clone repository**
```bash
git clone https://github.com/aliimndev/teroka-app.git
cd teroka-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env.local
```

4. **Configure environment variables**
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Maps Configuration
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. **Database setup**
```bash
# Import schema ke Supabase dashboard
# Jalankan seed data jika diperlukan
```

6. **Start development server**
```bash
npm run dev
```

7. **Buka aplikasi**
```
http://localhost:3000
```

---

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start development server dengan Turbopack
npm run build        # Build untuk production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues otomatis

# Database & Storage
npm run db:setup     # Setup database schema
npm run storage:init # Initialize Supabase storage
```

---

## 🔧 API Endpoints

### UMKM Management
- `GET /api/umkm` - Fetch semua UMKM
- `POST /api/umkm` - Create UMKM baru
- `PUT /api/umkm?id={id}` - Update UMKM
- `DELETE /api/umkm?id={id}` - Soft delete UMKM
- `GET /api/umkm/[id]` - Fetch UMKM detail dengan products & reviews

### Products Management
- `GET /api/products` - Fetch semua produk
- `POST /api/products` - Create produk baru

### Reviews Management
- `GET /api/reviews` - Fetch semua reviews
- `POST /api/reviews` - Create review baru

### File Management
- `POST /api/upload` - Upload file gambar
- `GET /api/cleanup-images` - Cleanup unused images
- `POST /api/setup-storage` - Setup Supabase storage buckets

### Admin Operations
- `GET /api/admin/unida` - Admin dashboard data

---

## 🗄️ Database Schema

### Tables Structure

#### `umkm` table
```sql
- id (uuid, primary key)
- name (text, not null)
- description (text)
- category (text) -- makanan, minuman, jasa, fashion, lainnya
- image (text) -- URL gambar utama
- location (text) -- Alamat lengkap
- latitude (float) -- Koordinat maps
- longitude (float) -- Koordinat maps
- contact (text) -- Informasi kontak
- created_at (timestamp)
- updated_at (timestamp)
- deleted_at (timestamp) -- Soft delete
```

#### `products` table
```sql
- id (uuid, primary key)
- umkm_id (uuid, foreign key)
- name (text, not null)
- description (text)
- price (integer)
- image (text) -- URL gambar produk
- created_at (timestamp)
```

#### `reviews` table
```sql
- id (uuid, primary key)
- umkm_id (uuid, foreign key)
- rating (integer, 1-5)
- comment (text)
- reviewer_name (text)
- created_at (timestamp)
```

---

## 🎨 UI Components Library

### Core Components
- **Button** - Variants: primary, secondary, outline, ghost
- **Card** - Container untuk content dengan shadow
- **Input** - Form input dengan validation
- **Container** - Responsive wrapper
- **Dialog** - Modal components

### Business Components
- **UmkmCard** - Card untuk display UMKM dengan image dan info
- **SearchBar** - Search input dengan location button
- **GoogleMapsEmbed** - Responsive Google Maps integration
- **SectionTitle** - Consistent section headers

### Animation Components
- **FadeIn** - Fade in animation dengan Framer Motion
- **SlideUp** - Slide up animation
- **Marquee** - Continuous scrolling text
- **RotatingHeadline** - Dynamic text rotation

---

## 🔒 Security Features

- **Row Level Security (RLS)** - Database access control
- **Input Validation** - Client dan server-side validation
- **File Upload Security** - Image validation dan sanitization
- **CORS Configuration** - Cross-origin resource sharing
- **Environment Variables** - Sensitive data protection

---

## 🚀 Deployment

### Environment Variables Production
```env
NEXT_PUBLIC_SUPABASE_URL=production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=production_service_role_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=production_maps_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm run start
```

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint untuk code consistency
- Write responsive components
- Test di multiple devices
- Document API changes

---

## 📞 Support

**Project Maintainer:** [Aliimn Dev](https://github.com/aliimndev)

**Contact:**
- 📧 Email: [your-email@example.com]
- 💬 Discord: [Your Discord]
- 🐛 Issues: [GitHub Issues](https://github.com/aliimndev/teroka-app/issues)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file untuk details.

---

## 🙏 Acknowledgments

- **Supabase** - Backend-as-a-Service provider
- **Vercel** - Next.js deployment platform
- **Google Maps** - Maps dan location services
- **shadcn/ui** - UI components library
- **Tailwind CSS** - CSS framework
- **Framer Motion** - Animation library

---

**🚀 Teroka - Temukan UMKM Lokal, Dukung Ekonomi Indonesia!**