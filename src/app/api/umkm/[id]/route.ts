import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    console.log('Searching for UMKM with ID:', params.id);

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