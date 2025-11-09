-- ============================================================================
-- TEROKA APP - SUPABASE DATABASE SCHEMA
-- ============================================================================
-- Description: Database schema for Teroka UMKM directory platform
-- Created: 2025-01-09
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: umkm
-- Description: Main table for UMKM (Usaha Mikro Kecil Menengah) businesses
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.umkm (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

    -- Basic Information
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('makanan', 'minuman', 'jasa', 'fashion', 'lainnya')),
    description TEXT,

    -- Location Information
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,

    -- Contact Information
    contact VARCHAR(20) NOT NULL,
    operating_hours VARCHAR(100) NOT NULL,

    -- Media
    image TEXT,

    -- Metrics
    rating DECIMAL(3, 2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),

    -- Additional Information
    owner_name VARCHAR(255),
    established_year INTEGER,
    employee_count INTEGER DEFAULT 0,
    total_customers INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,

    -- Status
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================================
-- TABLE: products
-- Description: Products or services offered by UMKM businesses
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

    -- Foreign key
    umkm_id UUID NOT NULL REFERENCES public.umkm(id) ON DELETE CASCADE,

    -- Product Information
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    category VARCHAR(50),

    -- Media
    image TEXT,

    -- Status
    is_available BOOLEAN DEFAULT TRUE
);

-- ============================================================================
-- TABLE: reviews
-- Description: Customer reviews for UMKM businesses
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

    -- Foreign key
    umkm_id UUID NOT NULL REFERENCES public.umkm(id) ON DELETE CASCADE,

    -- Review Information
    user_name VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,

    -- Media
    images TEXT[]
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- UMKM indexes
CREATE INDEX idx_umkm_category ON public.umkm(category);
CREATE INDEX idx_umkm_city ON public.umkm(city);
CREATE INDEX idx_umkm_province ON public.umkm(province);
CREATE INDEX idx_umkm_rating ON public.umkm(rating DESC);
CREATE INDEX idx_umkm_is_active ON public.umkm(is_active);
CREATE INDEX idx_umkm_location ON public.umkm(latitude, longitude);

-- Products indexes
CREATE INDEX idx_products_umkm_id ON public.products(umkm_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_is_available ON public.products(is_available);

-- Reviews indexes
CREATE INDEX idx_reviews_umkm_id ON public.reviews(umkm_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating DESC);
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_umkm
    BEFORE UPDATE ON public.umkm
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_products
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_reviews
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Function to update UMKM rating and review count
CREATE OR REPLACE FUNCTION public.update_umkm_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.umkm
    SET
        rating = (
            SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)
            FROM public.reviews
            WHERE umkm_id = COALESCE(NEW.umkm_id, OLD.umkm_id)
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE umkm_id = COALESCE(NEW.umkm_id, OLD.umkm_id)
        )
    WHERE id = COALESCE(NEW.umkm_id, OLD.umkm_id);

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update rating when reviews change
CREATE TRIGGER update_rating_on_review_insert
    AFTER INSERT ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_umkm_rating();

CREATE TRIGGER update_rating_on_review_update
    AFTER UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_umkm_rating();

CREATE TRIGGER update_rating_on_review_delete
    AFTER DELETE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_umkm_rating();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE public.umkm ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policies for public read access (anyone can view active UMKM)
CREATE POLICY "Enable read access for all users" ON public.umkm
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Enable read access for all users" ON public.products
    FOR SELECT USING (is_available = TRUE);

CREATE POLICY "Enable read access for all users" ON public.reviews
    FOR SELECT USING (TRUE);

-- Note: Write policies should be added based on your authentication setup
-- For now, we allow all operations (you should restrict this in production)
CREATE POLICY "Enable insert for all users" ON public.umkm
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Enable update for all users" ON public.umkm
    FOR UPDATE USING (TRUE);

CREATE POLICY "Enable insert for all users" ON public.products
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Enable update for all users" ON public.products
    FOR UPDATE USING (TRUE);

CREATE POLICY "Enable insert for all users" ON public.reviews
    FOR INSERT WITH CHECK (TRUE);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.umkm IS 'Main table storing UMKM business information';
COMMENT ON TABLE public.products IS 'Products and services offered by UMKM businesses';
COMMENT ON TABLE public.reviews IS 'Customer reviews and ratings for UMKM businesses';

COMMENT ON COLUMN public.umkm.category IS 'Business category: makanan, minuman, jasa, fashion, lainnya';
COMMENT ON COLUMN public.umkm.rating IS 'Average rating (0-5) calculated from reviews';
COMMENT ON COLUMN public.umkm.latitude IS 'Latitude coordinate for location';
COMMENT ON COLUMN public.umkm.longitude IS 'Longitude coordinate for location';
