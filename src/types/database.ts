export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      umkm: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          category: string
          description: string | null
          address: string
          city: string
          province: string
          latitude: number
          longitude: number
          rating: number
          image: string | null
          contact: string
          operating_hours: string
          owner_name: string | null
          established_year: number | null
          employee_count: number | null
          total_customers: number | null
          total_reviews: number | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          category: string
          description?: string | null
          address: string
          city: string
          province: string
          latitude: number
          longitude: number
          rating?: number
          image?: string | null
          contact: string
          operating_hours: string
          owner_name?: string | null
          established_year?: number | null
          employee_count?: number | null
          total_customers?: number | null
          total_reviews?: number | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          category?: string
          description?: string | null
          address?: string
          city?: string
          province?: string
          latitude?: number
          longitude?: number
          rating?: number
          image?: string | null
          contact?: string
          operating_hours?: string
          owner_name?: string | null
          established_year?: number | null
          employee_count?: number | null
          total_customers?: number | null
          total_reviews?: number | null
          is_active?: boolean
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          umkm_id: string
          name: string
          description: string | null
          price: number
          image: string | null
          category: string | null
          is_available: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          umkm_id: string
          name: string
          description?: string | null
          price: number
          image?: string | null
          category?: string | null
          is_available?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          umkm_id?: string
          name?: string
          description?: string | null
          price?: number
          image?: string | null
          category?: string | null
          is_available?: boolean
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          umkm_id: string
          user_name: string
          rating: number
          comment: string | null
          images: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          umkm_id: string
          user_name: string
          rating: number
          comment?: string | null
          images?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          umkm_id?: string
          user_name?: string
          rating?: number
          comment?: string | null
          images?: string[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
