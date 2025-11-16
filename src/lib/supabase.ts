import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if Supabase is properly configured with real values (not placeholders)
const isValidSupabaseUrl = supabaseUrl &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.endsWith('.supabase.co')

const isValidSupabaseKey = supabaseAnonKey &&
  !supabaseAnonKey.includes('your-anon-key-here') &&
  supabaseAnonKey.length > 20

const isValidServiceRoleKey = supabaseServiceRoleKey &&
  !supabaseServiceRoleKey.includes('your-service-role-key-here') &&
  supabaseServiceRoleKey.length > 20

export const isSupabaseConfigured = Boolean(isValidSupabaseUrl && isValidSupabaseKey)
export const isServiceRoleConfigured = Boolean(isValidSupabaseUrl && isValidServiceRoleKey)

// Client for client-side operations (with RLS)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      global: {
        fetch: (url, options = {}) => {
          // Add timeout to all fetch requests
          return fetch(url, {
            ...options,
            signal: AbortSignal.timeout(10000), // 10 second timeout
          });
        },
      },
    })
  : null

// Client for server-side operations (bypasses RLS)
export const supabaseAdmin: SupabaseClient | null = isServiceRoleConfigured
  ? createClient(supabaseUrl!, supabaseServiceRoleKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        fetch: (url, options = {}) => {
          // Add timeout to all fetch requests
          return fetch(url, {
            ...options,
            signal: AbortSignal.timeout(15000), // 15 second timeout for admin operations
          });
        },
      },
    })
  : null

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase not configured with valid credentials')
  console.warn('Please add real NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file')
  console.warn('Using mock data for development...')
}

if (!isServiceRoleConfigured) {
  console.warn('⚠️ Supabase Service Role not configured')
  console.warn('Please add SUPABASE_SERVICE_ROLE_KEY to .env.local for admin operations')
  console.warn('Using fallback for uploads and admin operations...')
} else {
  console.log('✅ Supabase Service Role configured - Admin operations available')
}