import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Fetch all active UMKM from Supabase
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

    // Insert new UMKM to Supabase
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