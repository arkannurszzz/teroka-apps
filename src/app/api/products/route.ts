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
      console.log('📦 Using mock response for GET products (Supabase not configured)');

      const mockProducts = [
        {
          id: `mock-prod-1`,
          umkm_id: umkmId,
          name: 'Produk Sample 1',
          description: 'Deskripsi produk sample',
          price: 25000,
          category: 'makanan',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
          is_available: true,
          created_at: new Date().toISOString()
        }
      ];

      return NextResponse.json({
        success: true,
        data: mockProducts,
        message: 'Data produk berhasil dimuat (mock data)'
      });
    }

    // Fetch products from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('umkm_id', umkmId)
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: products || [],
      message: 'Data produk berhasil dimuat'
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal memuat data produk'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['umkm_id', 'name', 'price'];
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

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for POST product (Supabase not configured)');

      const mockResponse = {
        id: `mock-${Date.now()}`,
        ...body,
        is_available: true,
        created_at: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        data: mockResponse,
        message: 'Produk berhasil ditambahkan! (mock data)'
      }, { status: 201 });
    }

    // Insert new product to Supabase
    const { data: newProduct, error } = await supabase
      .from('products')
      .insert([
        {
          umkm_id: body.umkm_id,
          name: body.name,
          description: body.description || null,
          price: body.price,
          category: body.category || null,
          image: body.image || null,
          is_available: true
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
      data: newProduct,
      message: 'Produk berhasil ditambahkan!'
    }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal menambahkan produk'
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
          message: 'ID produk tidak ditemukan'
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'price'];
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

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for PUT product (Supabase not configured)');

      const mockResponse = {
        id,
        ...body,
        updated_at: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        data: mockResponse,
        message: 'Produk berhasil diperbarui! (mock data)'
      });
    }

    // Update product in Supabase
    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update({
        name: body.name,
        description: body.description || null,
        price: body.price,
        category: body.category || null,
        image: body.image || null,
        is_available: body.is_available !== undefined ? body.is_available : true
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
      data: updatedProduct,
      message: 'Produk berhasil diperbarui!'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal memperbarui produk'
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
          message: 'ID produk tidak ditemukan'
        },
        { status: 400 }
      );
    }

    // Use mock response if Supabase not configured
    if (!isSupabaseConfigured) {
      console.log('📦 Using mock response for DELETE product (Supabase not configured)');

      return NextResponse.json({
        success: true,
        data: { id },
        message: 'Produk berhasil dihapus! (mock data)'
      });
    }

    // Soft delete - set is_available to false
    const { data: deletedProduct, error } = await supabase
      .from('products')
      .update({
        is_available: false
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
            message: 'Produk tidak ditemukan'
          },
          { status: 404 }
        );
      }

      throw error;
    }

    return NextResponse.json({
      success: true,
      data: deletedProduct,
      message: 'Produk berhasil dihapus!'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Gagal menghapus produk'
      },
      { status: 500 }
    );
  }
}
