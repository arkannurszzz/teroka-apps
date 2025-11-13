import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase is properly configured with real values (not placeholders)
const isValidSupabaseUrl = supabaseUrl &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.endsWith('.supabase.co')

const isValidSupabaseKey = supabaseAnonKey &&
  !supabaseAnonKey.includes('your-anon-key-here') &&
  supabaseAnonKey.length > 20

export const isSupabaseConfigured = Boolean(isValidSupabaseUrl && isValidSupabaseKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase not configured with valid credentials')
  console.warn('Please add real NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file')
  console.warn('Using mock data for development...')
}