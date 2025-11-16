export interface Umkm {
  id: string;
  name: string;
  category: 'makanan' | 'minuman' | 'jasa' | 'fashion' | 'lainnya';
  image: string | null;
  location: string;
  description?: string;
  rating?: number;
  // Additional fields from Supabase
  address?: string;
  city?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  google_maps_link?: string;
  contact?: string;
  operating_hours?: string;
  owner_name?: string;
  established_year?: number;
  employee_count?: number;
  total_customers?: number;
  total_reviews?: number;
  // Relations
  products?: Product[];
  reviews?: Review[];
}

export interface Product {
  id: string;
  umkm_id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  umkm_id: string;
  user_name: string;
  rating: number;
  comment?: string;
  images?: string[];
  created_at?: string;
  updated_at?: string;
}