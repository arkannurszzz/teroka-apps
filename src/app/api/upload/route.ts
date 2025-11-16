import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isServiceRoleConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    if (!isServiceRoleConfigured || !supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Service role key not configured for storage operations'
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'No file provided'
        },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
        },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: 'File size too large. Maximum size is 5MB.'
        },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName; // Direct di root bucket umkm-images

    // Convert File to Buffer for Supabase
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('📤 Uploading to Supabase Storage:', {
      fileName: file.name,
      filePath,
      fileSize: file.size
    });

    // Upload to Supabase Storage using service role (bypasses RLS)
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('umkm-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('❌ Supabase storage upload error:', uploadError);
      return NextResponse.json(
        {
          success: false,
          error: `Upload failed: ${uploadError.message}`
        },
        { status: 500 }
      );
    }

    // Get public URL - manual construct to avoid double path
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/umkm-images/${fileName}`;
    console.log('✅ Supabase Upload successful:', {
      filePath,
      publicUrl,
      fileName: file.name,
      fileSize: file.size
    });

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: filePath
    });

  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload file'
      },
      { status: 500 }
    );
  }
}

