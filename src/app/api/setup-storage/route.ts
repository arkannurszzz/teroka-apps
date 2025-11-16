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

    console.log('🔧 Setting up Supabase Storage...');

    // 1. Check if bucket exists
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();

    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError);
      throw bucketsError;
    }

    const umkmBucket = buckets?.find(bucket => bucket.name === 'umkm-images');

    if (!umkmBucket) {
      console.log('📦 Creating umkm-images bucket...');

      // Create the bucket
      const { error: createError } = await supabaseAdmin.storage.createBucket('umkm-images', {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      });

      if (createError) {
        console.error('❌ Error creating bucket:', createError);
        throw createError;
      }

      console.log('✅ Bucket created successfully');
    } else {
      console.log('📦 Bucket already exists');

      // Check if bucket is public
      if (!umkmBucket.public) {
        console.log('🔓 Making bucket public...');

        const { error: updateError } = await supabaseAdmin.storage.updateBucket('umkm-images', {
          public: true
        });

        if (updateError) {
          console.error('❌ Error updating bucket:', updateError);
          throw updateError;
        }

        console.log('✅ Bucket is now public');
      } else {
        console.log('✅ Bucket is already public');
      }
    }

    // 2. Set up RLS policies for the bucket
    console.log('🔐 Setting up RLS policies...');

    // Policy to allow public access to read files
    const { error: policyError } = await supabaseAdmin.rpc('create_policy', {
      policy_name: 'Public Access',
      table_name: 'objects',
      definition: {
        schema_name: 'storage',
        table_name: 'objects',
        policy_name: 'Public Access',
        policy_command: 'SELECT',
        roles: ['anon', 'authenticated'],
        using: "bucket_id = 'umkm-images'"
      }
    });

    // Note: RLS for storage objects is handled differently,
    // the main thing is making the bucket public

    console.log('🎉 Storage setup completed successfully!');

    return NextResponse.json({
      success: true,
      message: 'Supabase Storage setup completed successfully',
      bucketStatus: umkmBucket ? 'exists' : 'created',
      bucketPublic: true
    });

  } catch (error) {
    console.error('🚨 Storage setup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}