export interface ProductFormData {
  id?: string; // For editing existing products
  name: string;
  description: string;
  price: string;
  image: string | File;
}

export interface UmkmFormData {
  name: string;
  category: string;
  description: string;
  address: string;
  province_id: string;  // ID from wilayah.id API
  province: string;      // Province name
  city_id: string;       // ID from wilayah.id API (regency)
  city: string;          // City/Regency name
  district: string;      // District/Kecamatan name
  contact: string;
  operating_hours_start: string;
  operating_hours_end: string;
  image: string | File;
  owner_name: string;
  established_year: string;
  employee_count: string;
  // New field for featured products
  featured_products: ProductFormData[];
}

export interface ProductFormErrors {
  name?: string;
  description?: string;
  price?: string;
  image?: string;
}

export interface FormErrors {
  name?: string;
  category?: string;
  description?: string;
  address?: string;
  province_id?: string;
  province?: string;
  city_id?: string;
  city?: string;
  district?: string;
  contact?: string;
  operating_hours_start?: string;
  operating_hours_end?: string;
  image?: string;
  owner_name?: string;
  established_year?: string;
  employee_count?: string;
  featured_products?: ProductFormErrors[];
}

export const initialFormData: UmkmFormData = {
  name: '',
  category: 'makanan',
  description: '',
  address: '',
  province_id: '',
  province: '',
  city_id: '',
  city: '',
  district: '',
  contact: '',
  operating_hours_start: '08:00',
  operating_hours_end: '17:00',
  image: '',
  owner_name: '',
  established_year: '',
  employee_count: '',
  featured_products: [],
};

export const validateFormField = (name: string, value: any): string | undefined => {
  switch (name) {
    case 'name':
      if (!value) return 'Nama UMKM wajib diisi';
      if (value.length < 3) return 'Nama UMKM minimal 3 karakter';
      if (value.length > 100) return 'Nama UMKM maksimal 100 karakter';
      break;

    case 'contact':
      if (!value) return 'Nomor telepon wajib diisi';
      // Remove all non-digits
      const digits = value.replace(/\D/g, '');
      if (!digits.startsWith('62')) return 'Nomor harus diawali +62 atau 62';
      if (digits.length < 10) return 'Nomor telepon tidak valid';
      if (digits.length > 15) return 'Nomor telepon terlalu panjang';
      break;

    case 'address':
      if (!value) return 'Alamat wajib diisi';
      if (value.length < 10) return 'Alamat minimal 10 karakter';
      break;

    case 'city':
      if (!value) return 'Kota wajib diisi';
      if (value.length < 2) return 'Nama kota tidak valid';
      break;

    case 'province':
      if (!value) return 'Provinsi wajib diisi';
      if (value.length < 2) return 'Nama provinsi tidak valid';
      break;

    case 'owner_name':
      if (!value) return 'Nama pemilik wajib diisi';
      if (value.length < 2) return 'Nama pemilik minimal 2 karakter';
      if (value.length > 50) return 'Nama pemilik maksimal 50 karakter';
      break;

    case 'established_year':
      if (value) {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (year < 1900) return 'Tahun tidak valid';
        if (year > currentYear) return 'Tahun tidak boleh lebih dari tahun sekarang';
      }
      break;

    case 'employee_count':
      if (value) {
        const count = parseInt(value);
        if (count < 0) return 'Jumlah karyawan tidak boleh negatif';
        if (count > 10000) return 'Jumlah karyawan tidak valid';
      }
      break;

    case 'image':
      if (value instanceof File) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(value.type)) {
          return 'Format file harus JPG, PNG, atau WebP';
        }
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (value.size > maxSize) {
          return 'Ukuran file maksimal 5MB';
        }
      }
      break;
  }

  return undefined;
};

export const validateProductField = (name: string, value: any): string | undefined => {
  switch (name) {
    case 'name':
      if (!value) return 'Nama produk wajib diisi';
      if (value.length < 2) return 'Nama produk minimal 2 karakter';
      if (value.length > 100) return 'Nama produk maksimal 100 karakter';
      break;

    case 'description':
      if (!value) return 'Deskripsi produk wajib diisi';
      if (value.length < 10) return 'Deskripsi produk minimal 10 karakter';
      if (value.length > 500) return 'Deskripsi produk maksimal 500 karakter';
      break;

    case 'price':
      if (!value) return 'Harga produk wajib diisi';
      const price = parseInt(value.replace(/\D/g, ''));
      if (isNaN(price) || price < 0) return 'Harga tidak valid';
      if (price < 1000) return 'Harga minimal Rp 1.000';
      if (price > 999999999) return 'Harga terlalu tinggi';
      break;

    case 'image':
      if (value instanceof File) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(value.type)) {
          return 'Format file harus JPG, PNG, atau WebP';
        }
        // Validate file size (max 3MB for product images)
        const maxSize = 3 * 1024 * 1024;
        if (value.size > maxSize) {
          return 'Ukuran file maksimal 3MB';
        }
      }
      break;
  }

  return undefined;
};

export const validateForm = (formData: UmkmFormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate all UMKM fields
  Object.keys(formData).forEach((key) => {
    if (key !== 'featured_products') {
      const error = validateFormField(key, formData[key as keyof UmkmFormData]);
      if (error) {
        errors[key as keyof FormErrors] = error;
      }
    }
  });

  // Validate featured products
  if (formData.featured_products && formData.featured_products.length > 0) {
    const productErrors: ProductFormErrors[] = [];

    formData.featured_products.forEach((product, index) => {
      const productError: ProductFormErrors = {};

      Object.keys(product).forEach((field) => {
        const error = validateProductField(field, product[field as keyof ProductFormData]);
        if (error) {
          productError[field as keyof ProductFormErrors] = error;
        }
      });

      if (Object.keys(productError).length > 0) {
        productErrors[index] = productError;
      }
    });

    if (productErrors.length > 0) {
      errors.featured_products = productErrors;
    }
  }

  // Validate time range
  if (formData.operating_hours_start && formData.operating_hours_end) {
    if (formData.operating_hours_start >= formData.operating_hours_end) {
      errors.operating_hours_end = 'Jam tutup harus setelah jam buka';
    }
  }

  return errors;
};

export const isFormValid = (formData: UmkmFormData, errors: FormErrors): boolean => {
  // Check if all required fields are filled
  const requiredFields: (keyof UmkmFormData)[] = [
    'name',
    'category',
    'address',
    'city',
    'province',
    'contact',
    'operating_hours_start',
    'operating_hours_end',
    'owner_name',
  ];

  const hasAllRequired = requiredFields.every((field) => {
    const value = formData[field];
    return value !== '' && value !== null && value !== undefined;
  });

  // Check if there are no errors
  const hasNoErrors = Object.keys(errors).length === 0;

  return hasAllRequired && hasNoErrors;
};
