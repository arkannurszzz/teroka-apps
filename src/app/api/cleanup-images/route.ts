import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isServiceRoleConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    if (!isServiceRoleConfigured || !supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Service role key not configured for cleanup operations'
        },
        { status: 500 }
      );
    }

    console.log('🧹 Starting image URL cleanup...');

    // Get all UMKM records that have image URLs with duplicate paths
    const { data: umkmRecords, error: fetchError } = await supabaseAdmin
      .from('umkm')
      .select('id, name, image')
      .not('image', 'is', null)
      .like('image', '%/umkm-images/umkm-images/%');

    if (fetchError) {
      console.error('❌ Error fetching UMKM records:', fetchError);
      throw fetchError;
    }

    if (!umkmRecords || umkmRecords.length === 0) {
      console.log('✅ No records with duplicate image paths found');
      return NextResponse.json({
        success: true,
        message: 'No cleanup needed - no duplicate image paths found',
        recordsUpdated: 0
      });
    }

    console.log(`📊 Found ${umkmRecords.length} records to clean up`);

    let updatedCount = 0;
    const errors: Array<{ id: string; name: string; error: string }> = [];

    // Update each record to fix the image URL
    for (const record of umkmRecords) {
      try {
        // Fix the image URL
        let fixedImageUrl = record.image;

        // Remove duplicate umkm-images in path
        fixedImageUrl = fixedImageUrl.replace(/\/umkm-images\/umkm-images\//g, '/umkm-images/');

        // If it starts with umkm-images/, remove it (since files are in root of bucket)
        fixedImageUrl = fixedImageUrl.replace(/^umkm-images\//, '');

        console.log(`🔧 Processing ${record.name}:`);
        console.log(`   Original: ${record.image}`);
        console.log(`   Fixed:   ${fixedImageUrl}`);

        // Update the record
        const { error: updateError } = await supabaseAdmin
          .from('umkm')
          .update({ image: fixedImageUrl })
          .eq('id', record.id);

        if (updateError) {
          console.error(`❌ Error updating ${record.name}:`, updateError);
          errors.push({
            id: record.id,
            name: record.name,
            error: updateError.message
          });
        } else {
          console.log(`✅ Updated ${record.name}`);
          updatedCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${record.name}:`, error);
        errors.push({
          id: record.id,
          name: record.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    console.log(`🎉 Cleanup completed. Updated ${updatedCount} records`);

    return NextResponse.json({
      success: true,
      message: `Image URL cleanup completed. Updated ${updatedCount} out of ${umkmRecords.length} records.`,
      recordsUpdated: updatedCount,
      recordsFound: umkmRecords.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('🚨 Cleanup script error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}