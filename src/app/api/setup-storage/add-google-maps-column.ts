// Script untuk menambahkan kolom google_maps_link ke tabel UMKM
// Jalankan dengan: node -r esbuild-register src/app/api/setup-storage/add-google-maps-column.ts

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials. Check your .env.local file.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addGoogleMapsColumn() {
  try {
    console.log('🔍 Checking if google_maps_link column exists in umkm table...');

    // Cek struktur tabel dengan query ke information_schema
    const { data: columns, error: checkError } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', 'umkm')
      .eq('column_name', 'google_maps_link')
      .eq('table_schema', 'public');

    if (checkError) {
      console.error('❌ Error checking column:', checkError);
      return;
    }

    if (columns && columns.length > 0) {
      console.log('✅ Column google_maps_link already exists in umkm table');
      return;
    }

    console.log('📝 Adding google_maps_link column to umkm table...');

    // Tambahkan kolom google_maps_link menggunakan SQL
    const { error: addError } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE umkm ADD COLUMN google_maps_link TEXT;`
    });

    if (addError) {
      console.error('❌ Error adding column:', addError);
      console.log('\n📋 Manual SQL command to run in Supabase SQL Editor:');
      console.log('ALTER TABLE umkm ADD COLUMN google_maps_link TEXT;');
      return;
    }

    console.log('✅ Successfully added google_maps_link column to umkm table');

    // Update sample data untuk testing
    console.log('\n🔄 Updating sample data for testing...');
    const { error: updateError } = await supabase
      .from('umkm')
      .update({
        google_maps_link: 'https://www.google.com/maps/place/Warung+Nasi+Bu+Ani'
      })
      .eq('name', 'Mie Ayam dan Bakso Family WP')
      .select();

    if (updateError) {
      console.log('⚠️ Could not update sample data (this is okay if no matching record found)');
    } else {
      console.log('✅ Updated sample data with Google Maps link');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Jalankan fungsi
addGoogleMapsColumn().then(() => {
  console.log('\n🎉 Process completed!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Process failed:', error);
  process.exit(1);
});