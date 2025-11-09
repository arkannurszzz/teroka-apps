import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Mock data - reuse from GET /api/umkm
const mockUmkmData = [
  {
    id: '1',
    name: 'Warung Nasi Bu Ani',
    category: 'makanan',
    description: 'Nasi rames dengan lauk pilihan',
    address: 'Jl. Merdeka No. 123',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    latitude: -6.2088,
    longitude: 106.8456,
    rating: 4.5,
    contact: '+62812345678',
    operating_hours: '08:00-21:00',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    owner_name: 'Bu Ani',
    established_year: 2015,
    employee_count: 5,
    total_customers: 1200,
    total_reviews: 45,
  },
  {
    id: '2',
    name: 'Kedai Kopi Santai',
    category: 'minuman',
    description: 'Kopi nusantara berkualitas',
    address: 'Jl. Gatot Subroto No. 88',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    latitude: -7.7956,
    longitude: 110.3695,
    rating: 4.6,
    contact: '+62877665544',
    operating_hours: '10:00-22:00',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    owner_name: 'Mas Budi',
    established_year: 2018,
    employee_count: 4,
    total_customers: 1500,
    total_reviews: 67,
  },
  {
    id: '3',
    name: 'Bengkel Maju Jaya',
    category: 'jasa',
    description: 'Service kendaraan profesional',
    address: 'Jl. Industri No. 45',
    city: 'Bandung',
    province: 'Jawa Barat',
    latitude: -6.9175,
    longitude: 107.6191,
    rating: 4.2,
    contact: '+62898765432',
    operating_hours: '09:00-18:00',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    owner_name: 'Pak Jaya',
    established_year: 2010,
    employee_count: 8,
    total_customers: 3500,
    total_reviews: 89,
  },
  {
    id: '4',
    name: 'Toko Kue Nyonya',
    category: 'makanan',
    description: 'Kue tradisional dan modern',
    address: 'Jl. Sudirman No. 78',
    city: 'Surabaya',
    province: 'Jawa Timur',
    latitude: -7.2575,
    longitude: 112.7521,
    rating: 4.8,
    contact: '+62811223344',
    operating_hours: '07:00-20:00',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    owner_name: 'Nyonya Lim',
    established_year: 2012,
    employee_count: 6,
    total_customers: 2800,
    total_reviews: 120,
  },
  {
    id: '5',
    name: 'Butik Cantik Modis',
    category: 'fashion',
    description: 'Fashion wanita trendy',
    address: 'Jl. Malioboro No. 200',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    latitude: -7.7926,
    longitude: 110.3656,
    rating: 4.3,
    contact: '+62822334455',
    operating_hours: '09:00-21:00',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    owner_name: 'Ibu Siti',
    established_year: 2016,
    employee_count: 3,
    total_customers: 950,
    total_reviews: 34,
  },
  {
    id: '6',
    name: 'Bakso Mercon Pak Kumis',
    category: 'makanan',
    description: 'Bakso pedas legendaris',
    address: 'Jl. Pahlawan No. 34',
    city: 'Malang',
    province: 'Jawa Timur',
    latitude: -7.9666,
    longitude: 112.6326,
    rating: 4.7,
    contact: '+62833445566',
    operating_hours: '10:00-22:00',
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800',
    owner_name: 'Pak Kumis',
    established_year: 2008,
    employee_count: 4,
    total_customers: 3200,
    total_reviews: 156,
  },
];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    console.log('Searching for UMKM with ID:', params.id);

    // Use mock data if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock data (Supabase not configured)');

      const umkm = mockUmkmData.find(item => item.id === params.id);

      if (!umkm) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: 'UMKM tidak ditemukan'
          },
          { status: 404 }
        );
      }

      // Mock products for this UMKM
      const mockProducts = [
        {
          id: `${umkm.id}-prod-1`,
          umkm_id: umkm.id,
          name: umkm.category === 'makanan' ? 'Paket Komplit' : umkm.category === 'minuman' ? 'Kopi Spesial' : 'Layanan Premium',
          description: 'Produk unggulan kami dengan kualitas terbaik',
          price: 25000,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
          is_available: true,
          created_at: new Date().toISOString()
        },
        {
          id: `${umkm.id}-prod-2`,
          umkm_id: umkm.id,
          name: umkm.category === 'makanan' ? 'Paket Hemat' : umkm.category === 'minuman' ? 'Es Kopi Susu' : 'Layanan Reguler',
          description: 'Pilihan hemat dengan rasa yang tetap enak',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
          is_available: true,
          created_at: new Date().toISOString()
        },
        {
          id: `${umkm.id}-prod-3`,
          umkm_id: umkm.id,
          name: umkm.category === 'makanan' ? 'Paket Spesial' : umkm.category === 'minuman' ? 'Teh Manis' : 'Layanan Express',
          description: 'Produk spesial dengan bahan pilihan',
          price: 30000,
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
          is_available: true,
          created_at: new Date().toISOString()
        }
      ];

      // Mock reviews for this UMKM
      const mockReviews = [
        {
          id: `${umkm.id}-rev-1`,
          umkm_id: umkm.id,
          user_name: 'Andi Pratama',
          rating: 5,
          comment: 'Pelayanan sangat memuaskan! Kualitas produk juga bagus. Recommended banget!',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
        },
        {
          id: `${umkm.id}-rev-2`,
          umkm_id: umkm.id,
          user_name: 'Siti Nurhaliza',
          rating: 4,
          comment: 'Bagus, tapi pengiriman agak lama. Overall puas dengan produknya.',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
        },
        {
          id: `${umkm.id}-rev-3`,
          umkm_id: umkm.id,
          user_name: 'Budi Santoso',
          rating: 5,
          comment: 'Sudah langganan di sini, selalu puas dengan kualitas dan harganya!',
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 2 weeks ago
        }
      ];

      const transformedData = {
        id: umkm.id,
        name: umkm.name,
        category: umkm.category,
        image: umkm.image || '',
        location: umkm.city,
        description: umkm.description || '',
        address: umkm.address,
        city: umkm.city,
        province: umkm.province,
        latitude: umkm.latitude,
        longitude: umkm.longitude,
        rating: umkm.rating,
        contact: umkm.contact,
        operating_hours: umkm.operating_hours,
        owner_name: umkm.owner_name,
        established_year: umkm.established_year,
        employee_count: umkm.employee_count,
        total_customers: umkm.total_customers,
        total_reviews: umkm.total_reviews,
        products: mockProducts,
        reviews: mockReviews
      };

      return NextResponse.json({
        success: true,
        data: transformedData,
        message: 'Data UMKM berhasil dimuat (mock data)'
      });
    }

    // Fetch UMKM with products and reviews from Supabase
    const { data: umkm, error: umkmError } = await supabase
      .from('umkm')
      .select(`
        *,
        products (*),
        reviews (*)
      `)
      .eq('id', params.id)
      .eq('is_active', true)
      .single();

    if (umkmError) {
      console.error('Supabase error:', umkmError);

      if (umkmError.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: 'UMKM tidak ditemukan'
          },
          { status: 404 }
        );
      }

      throw umkmError;
    }

    if (!umkm) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'UMKM tidak ditemukan'
        },
        { status: 404 }
      );
    }

    console.log('Found UMKM:', umkm);

    // Transform data to match frontend format
    const transformedData = {
      id: umkm.id,
      name: umkm.name,
      category: umkm.category,
      image: umkm.image || '',
      location: umkm.city,
      description: umkm.description || '',
      address: umkm.address,
      city: umkm.city,
      province: umkm.province,
      latitude: umkm.latitude,
      longitude: umkm.longitude,
      rating: umkm.rating,
      contact: umkm.contact,
      operating_hours: umkm.operating_hours,
      owner_name: umkm.owner_name,
      established_year: umkm.established_year,
      employee_count: umkm.employee_count,
      total_customers: umkm.total_customers,
      total_reviews: umkm.total_reviews,
      products: umkm.products || [],
      reviews: umkm.reviews || []
    };

    return NextResponse.json({
      success: true,
      data: transformedData,
      message: 'Data UMKM berhasil dimuat'
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal memuat data UMKM'
      },
      { status: 500 }
    );
  }
}