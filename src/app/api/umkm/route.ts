import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin, isSupabaseConfigured, isServiceRoleConfigured } from '@/lib/supabase';

// Type for mock data storage
interface MockUmkmItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  address: string;
  city?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  google_maps_link?: string;
  rating?: number;
  contact?: string;
  operating_hours?: string;
  image?: string;
  owner_name?: string;
  established_year?: number;
  employee_count?: number;
  total_customers?: number;
  total_reviews?: number;
  is_active: boolean;
  created_at: string;
}

// In-memory storage for mock data (for development)
const mockDataStorage: MockUmkmItem[] = [];

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
    google_maps_link: 'https://www.google.com/maps/place/Warung+Nasi+Bu+Ani',
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
  {
    id: 'ende-laundry-1',
    name: 'Ende Laundry',
    category: 'jasa',
    description: 'Jasa laundry profesional dengan harga terjangkau. Cuci kering, setrika, dan layanan laundry kiloan.',
    address: 'Jl. Cibinong Raya No. 45',
    city: 'Bogor',
    province: 'Jawa Barat',
    latitude: -6.65658049333821,
    longitude: 106.847450575786,
    google_maps_link: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.9220732667695!2d106.847450575786!3d-6.65658049333821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c9016d1f8b89%3A0x9fcb511ae5f91f61!2sEnde%20laundry!5e0!3m2!1sen!2sid!4v1763198127641!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    rating: 4.7,
    contact: '+628123456789',
    operating_hours: '08:00-20:00',
    image: 'https://images.unsplash.com/photo-1534753449637-1cbaebf8ccaa?w=800',
    owner_name: 'Bapak Endi',
    established_year: 2020,
    employee_count: 8,
    total_customers: 850,
    total_reviews: 32,
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

      // Combine static mock data with dynamically added data
      const allMockData = [...mockUmkmData, ...mockDataStorage];

      const transformedData = allMockData.map(umkm => ({
        id: umkm.id,
        name: umkm.name,
        category: umkm.category,
        image: umkm.image || null,
        location: umkm.city || 'Unknown',
        description: umkm.description || '',
        address: umkm.address,
        city: umkm.city,
        province: umkm.province,
        latitude: umkm.latitude || -6.2088,
        longitude: umkm.longitude || 106.8456,
        rating: umkm.rating,
        contact: umkm.contact,
        operating_hours: umkm.operating_hours,
        owner_name: umkm.owner_name,
        established_year: umkm.established_year,
        employee_count: umkm.employee_count,
        total_customers: umkm.total_customers || 0,
        total_reviews: umkm.total_reviews || 0
      }));

      return NextResponse.json({
        success: true,
        data: transformedData,
        message: 'Data berhasil dimuat (mock data)',
        total: transformedData.length
      });
    }

    // Fetch all active UMKM from Supabase with retry logic
    if (!supabase) {
      throw new Error('Supabase client is not configured');
    }

    let umkmData = null;
    let error = null;
    let retryCount = 0;
    const maxRetries = 3;

    // Retry logic for fetch failures
    while (retryCount < maxRetries) {
      try {
        console.log(`🔄 Attempting to fetch from Supabase (attempt ${retryCount + 1}/${maxRetries})`);

        const result = await supabase
          .from('umkm')
          .select('*')
          .eq('is_active', true)
          .order('rating', { ascending: false });

        umkmData = result.data;
        error = result.error;

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        // Success - break out of retry loop
        break;

      } catch (fetchError: any) {
        console.error(`Fetch attempt ${retryCount + 1} failed:`, fetchError);
        retryCount++;

        if (retryCount >= maxRetries) {
          console.error('❌ All retry attempts failed, falling back to mock data');
          // Fallback to mock data if all retries fail
          const transformedData = mockUmkmData.map(umkm => ({
            id: umkm.id,
            name: umkm.name,
            category: umkm.category,
            image: umkm.image || null,
            location: umkm.city || 'Unknown',
            description: umkm.description || '',
            address: umkm.address,
            city: umkm.city,
            province: umkm.province,
            latitude: umkm.latitude || -6.2088,
            longitude: umkm.longitude || 106.8456,
            google_maps_link: umkm.google_maps_link,
            rating: umkm.rating,
            contact: umkm.contact,
            operating_hours: umkm.operating_hours,
            owner_name: umkm.owner_name,
            established_year: umkm.established_year,
            employee_count: umkm.employee_count,
            total_customers: umkm.total_customers || 0,
            total_reviews: umkm.total_reviews || 0
          }));

          return NextResponse.json({
            success: true,
            data: transformedData,
            message: 'Data berhasil dimuat (fallback to mock data due to connection issues)',
            total: transformedData.length
          });
        }

        // Wait before retry (exponential backoff)
        const delay = Math.pow(2, retryCount - 1) * 1000; // 1s, 2s, 4s
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Helper function to fix incorrect image URLs
    const fixImageUrl = (url: string | null): string | null => {
      if (!url) return null;

      // If it's a mock URL from picsum.photos, return as-is
      if (url.includes('picsum.photos')) {
        return url;
      }

      // If it's already a full Supabase URL, return as-is
      if (url.includes('supabase.co') && url.includes('/storage/v1')) {
        return url;
      }

      // Fix URLs with duplicate umkm-images in path: /umkm-images/umkm-images/... -> /umkm-images/...
      let fixedUrl = url.replace(/\/umkm-images\/umkm-images\//g, '/umkm-images/');

      // Fix URLs that start with umkm-images/ but should be just filename
      // If path is umkm-images/filename.jpg, it should be just filename.jpg
      fixedUrl = fixedUrl.replace(/^umkm-images\//, '');

      return fixedUrl;
    };

    // Transform data to match frontend format
    const transformedData = umkmData?.map(umkm => ({
      id: umkm.id,
      name: umkm.name,
      category: umkm.category,
      image: fixImageUrl(umkm.image),
      location: umkm.city,
      description: umkm.description || '',
      address: umkm.address,
      city: umkm.city,
      province: umkm.province,
      latitude: umkm.latitude,
      longitude: umkm.longitude,
      google_maps_link: umkm.google_maps_link,
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

    // Log more details for debugging fetch errors
    if (error instanceof Error) {
      if (error.message.includes('fetch failed')) {
        console.error('🔗 Fetch failure details:', {
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          supabaseConfigured: isSupabaseConfigured,
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing'
        });

        // Return a more user-friendly error for fetch failures
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: 'Koneksi ke database gagal. Silakan coba lagi beberapa saat.',
            errorType: 'connection_error'
          },
          { status: 500 }
        );
      }
    }

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
        is_active: true,
        latitude: -6.2088 + (Math.random() - 0.5) * 0.1, // Random location around Jakarta
        longitude: 106.8456 + (Math.random() - 0.5) * 0.1,
      };

      // Store in mock data storage for GET requests
      mockDataStorage.push(mockResponse);

      return NextResponse.json({
        success: true,
        data: mockResponse,
        message: 'UMKM berhasil didaftarkan! (mock data - Supabase not configured)'
      }, { status: 201 });
    }

    // Insert new UMKM to Supabase
    // Use admin client if available, otherwise use regular client
    const supabaseClient = supabaseAdmin || supabase;
    if (!supabaseClient) {
      throw new Error('Supabase client is not configured');
    }

    console.log('📝 Creating UMKM with data:', {
      name: body.name,
      category: body.category,
      image: body.image,
      city: body.city,
      province: body.province
    });

    // Insert UMKM with transaction to also add products
    const { data: newUmkm, error: umkmError } = await supabaseClient
      .from('umkm')
      .insert([
        {
          name: body.name,
          category: body.category,
          description: body.description || null,
          address: body.address,
          province_id: body.province_id || null,
          province: body.province,
          city_id: body.city_id || null,
          city: body.city,
          district: body.district || null,
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

    if (umkmError) {
      console.error('Supabase insert error:', umkmError);
      throw umkmError;
    }

    // If there are products, insert them
    if (body.products && Array.isArray(body.products) && body.products.length > 0) {
      console.log('📦 Inserting products:', body.products.length);

      const productsToInsert = body.products.map((product: any) => ({
        umkm_id: newUmkm.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image || null,
        is_available: product.is_available !== undefined ? product.is_available : true
      }));

      const { error: productsError } = await supabaseClient
        .from('products')
        .insert(productsToInsert);

      if (productsError) {
        console.error('❌ Error inserting products:', productsError);
        // Don't fail the entire operation if products fail to insert
        // UMKM is already created, products can be added later
        console.warn('⚠️ UMKM created but products failed to insert');
      } else {
        console.log('✅ Products inserted successfully');
      }
    }

    if (umkmError) {
      console.error('Supabase insert error:', umkmError);

      // If it's an RLS policy error and we don't have service role key, suggest solution
      if (umkmError.message?.includes('row-level security policy') && !isServiceRoleConfigured) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: 'RLS Policy Error: Anda perlu menambahkan SUPABASE_SERVICE_ROLE_KEY ke .env.local untuk bypass RLS policy saat registrasi UMKM baru.'
          },
          { status: 403 }
        );
      }

      throw umkmError;
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
    if (!supabase) {
      throw new Error('Supabase client is not configured');
    }

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
    if (!supabase) {
      throw new Error('Supabase client is not configured');
    }

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