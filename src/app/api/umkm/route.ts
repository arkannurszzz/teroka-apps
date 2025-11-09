import { NextResponse } from 'next/server';
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