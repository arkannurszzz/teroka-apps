import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const umkmId = searchParams.get('umkm_id');

    if (!umkmId) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'UMKM ID diperlukan'
        },
        { status: 400 }
      );
    }

    // Use mock data if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for GET reviews (Supabase not configured)');

      const mockReviews = [
        {
          id: `mock-review-1`,
          umkm_id: umkmId,
          user_name: 'Ahmad Rizki',
          rating: 5,
          comment: 'Pelayanan sangat memuaskan! Recommended!',
          image: null,
          created_at: new Date().toISOString()
        }
      ];

      return NextResponse.json({
        success: true,
        data: mockReviews,
        message: 'Data review berhasil dimuat (mock data)'
      });
    }

    // Fetch reviews from Supabase
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('umkm_id', umkmId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: reviews || [],
      message: 'Data review berhasil dimuat'
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal memuat data review'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['umkm_id', 'user_name', 'rating'];
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

    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'Rating harus antara 1-5'
        },
        { status: 400 }
      );
    }

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for POST review (Supabase not configured)');

      const mockResponse = {
        id: `mock-${Date.now()}`,
        ...body,
        created_at: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        data: mockResponse,
        message: 'Review berhasil ditambahkan! (mock data)'
      }, { status: 201 });
    }

    // Insert new review to Supabase
    const { data: newReview, error } = await supabase
      .from('reviews')
      .insert([
        {
          umkm_id: body.umkm_id,
          user_name: body.user_name,
          rating: body.rating,
          comment: body.comment || null,
          image: body.image || null
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
      data: newReview,
      message: 'Review berhasil ditambahkan!'
    }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal menambahkan review'
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
          message: 'ID review tidak ditemukan'
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['user_name', 'rating'];
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

    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'Rating harus antara 1-5'
        },
        { status: 400 }
      );
    }

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for PUT review (Supabase not configured)');

      const mockResponse = {
        id,
        ...body,
        updated_at: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        data: mockResponse,
        message: 'Review berhasil diperbarui! (mock data)'
      });
    }

    // Update review in Supabase
    const { data: updatedReview, error } = await supabase
      .from('reviews')
      .update({
        user_name: body.user_name,
        rating: body.rating,
        comment: body.comment || null,
        image: body.image || null
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
      data: updatedReview,
      message: 'Review berhasil diperbarui!'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal memperbarui review'
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
          message: 'ID review tidak ditemukan'
        },
        { status: 400 }
      );
    }

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for DELETE review (Supabase not configured)');

      return NextResponse.json({
        success: true,
        data: { id },
        message: 'Review berhasil dihapus! (mock data)'
      });
    }

    // Hard delete review from Supabase
    const { data: deletedReview, error } = await supabase
      .from('reviews')
      .delete()
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
            message: 'Review tidak ditemukan'
          },
          { status: 404 }
        );
      }

      throw error;
    }

    return NextResponse.json({
      success: true,
      data: deletedReview,
      message: 'Review berhasil dihapus!'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal menghapus review'
      },
      { status: 500 }
    );
  }
}
