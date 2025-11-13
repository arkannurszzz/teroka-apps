import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Mock data fallback
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
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

export async function GET() {
  try {
    // Use mock data if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock data (Supabase not configured)');

      const transformedData = mockUmkmData.map(umkm => ({
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
        total_reviews: umkm.total_reviews
      }));

      return NextResponse.json({
        success: true,
        data: transformedData,
        message: 'Data berhasil dimuat (mock data)',
        total: transformedData.length
      });
    }

    // Fetch all active UMKM from Supabase
    if (!supabase) {
      throw new Error('Supabase client is not configured');
    }

    const { data: umkmData, error } = await supabase
      .from('umkm')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Transform data to match frontend format
    const transformedData = umkmData?.map(umkm => ({
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
      total_reviews: umkm.total_reviews
    })) || [];

    return NextResponse.json({
      success: true,
      data: transformedData,
      message: 'Data berhasil dimuat',
      total: transformedData.length
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'category', 'address', 'city', 'province', 'contact', 'operating_hours'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: `Field yang wajib diisi: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['makanan', 'minuman', 'jasa', 'fashion', 'lainnya'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'Kategori tidak valid'
        },
        { status: 400 }
      );
    }

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for POST (Supabase not configured)');

      // Simulate success response
      const mockResponse = {
        id: `mock-${Date.now()}`,
        ...body,
        created_at: new Date().toISOString(),
        rating: 0,
        total_reviews: 0,
        is_active: true
      };

      return NextResponse.json({
        success: true,
        data: mockResponse,
        message: 'UMKM berhasil didaftarkan! (mock data - Supabase not configured)'
      }, { status: 201 });
    }

    // Insert new UMKM to Supabase
    if (!supabase) {
      throw new Error('Supabase client is not configured');
    }

    const { data: newUmkm, error } = await supabase
      .from('umkm')
      .insert([
        {
          name: body.name,
          category: body.category,
          description: body.description || null,
          address: body.address,
          city: body.city,
          province: body.province,
          latitude: body.latitude || 0,
          longitude: body.longitude || 0,
          contact: body.contact,
          operating_hours: body.operating_hours,
          image: body.image || null,
          owner_name: body.owner_name || null,
          established_year: body.established_year || null,
          employee_count: body.employee_count || 0,
          is_active: true
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: newUmkm,
      message: 'UMKM berhasil didaftarkan! Tim kami akan meninjau data Anda.'
    }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal mendaftarkan UMKM. Silakan coba lagi.'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'ID UMKM tidak ditemukan'
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'category', 'address', 'city', 'province', 'contact', 'operating_hours'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: `Field yang wajib diisi: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['makanan', 'minuman', 'jasa', 'fashion', 'lainnya'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'Kategori tidak valid'
        },
        { status: 400 }
      );
    }

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for PUT (Supabase not configured)');

      const mockResponse = {
        id,
        ...body,
        updated_at: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        data: mockResponse,
        message: 'UMKM berhasil diperbarui! (mock data - Supabase not configured)'
      });
    }

    // Update UMKM in Supabase
    const { data: updatedUmkm, error } = await supabase
      .from('umkm')
      .update({
        name: body.name,
        category: body.category,
        description: body.description || null,
        address: body.address,
        city: body.city,
        province: body.province,
        latitude: body.latitude || 0,
        longitude: body.longitude || 0,
        contact: body.contact,
        operating_hours: body.operating_hours,
        image: body.image || null,
        owner_name: body.owner_name || null,
        established_year: body.established_year || null,
        employee_count: body.employee_count || 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: updatedUmkm,
      message: 'UMKM berhasil diperbarui!'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal memperbarui UMKM. Silakan coba lagi.'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'ID UMKM tidak ditemukan'
        },
        { status: 400 }
      );
    }

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for DELETE (Supabase not configured)');

      return NextResponse.json({
        success: true,
        data: { id },
        message: 'UMKM berhasil dihapus! (mock data - Supabase not configured)'
      });
    }

    // Soft delete - set is_active to false instead of permanently deleting
    const { data: deletedUmkm, error } = await supabase
      .from('umkm')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase delete error:', error);

      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: 'UMKM tidak ditemukan'
          },
          { status: 404 }
        );
      }

      throw error;
    }

    return NextResponse.json({
      success: true,
      data: deletedUmkm,
      message: 'UMKM berhasil dihapus!'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal menghapus UMKM. Silakan coba lagi.'
      },
      { status: 500 }
    );
  }
}