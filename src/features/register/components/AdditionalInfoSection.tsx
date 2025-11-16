import { Input } from '@/components/ui/input';
import { useState, useRef } from 'react';
import Image from 'next/image';
import type { UmkmFormData, FormErrors } from '../types';

interface AdditionalInfoSectionProps {
  formData: UmkmFormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (file: File | null) => void;
}

export function AdditionalInfoSection({ formData, errors, onChange, onImageChange }: AdditionalInfoSectionProps) {
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        onImageChange(null);
        setImagePreview('');
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        onImageChange(null);
        setImagePreview('');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        Finalisasi UMKM
      </h2>

      <p className="text-gray-600 mb-6">
        Lengkapi detail informasi UMKM Anda dan siap untuk didaftarkan di platform Teroka.
      </p>

      {/* Summary Section */}
      {formData.name && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            📋 Ringkasan UMKM Anda
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Nama UMKM:</span>
              <p className="text-gray-900">{formData.name}</p>
            </div>

            <div>
              <span className="font-medium text-gray-700">Kategori:</span>
              <p className="text-gray-900 capitalize">{formData.category}</p>
            </div>

            <div>
              <span className="font-medium text-gray-700">Lokasi:</span>
              <p className="text-gray-900">{formData.city}, {formData.province}</p>
            </div>

            <div>
              <span className="font-medium text-gray-700">Kontak:</span>
              <p className="text-gray-900">{formData.contact}</p>
            </div>
          </div>

          {formData.featured_products && formData.featured_products.length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-200">
              <span className="font-medium text-gray-700">Produk Unggulan:</span>
              <div className="mt-2 space-y-1">
                {formData.featured_products.slice(0, 3).map((product, index) => (
                  <div key={index} className="text-gray-900">
                    • {product.name} - Rp{product.price}
                  </div>
                ))}
                {formData.featured_products.length > 3 && (
                  <div className="text-gray-600 text-xs">
                    ... dan {formData.featured_products.length - 3} produk lainnya
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {/* Upload Gambar */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Foto/Logo UMKM
          </label>

          {imagePreview && (
            <div className="mb-3 relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.image ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{errors.image}</p>
          )}
          {!errors.image && (
            <p className="mt-1 text-xs text-gray-500">
              Format: JPG, PNG, WebP. Maksimal 5MB
            </p>
          )}
        </div>

        {/* Owner Name & Tahun Berdiri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="owner_name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pemilik
            </label>
            <Input
              id="owner_name"
              name="owner_name"
              type="text"
              value={formData.owner_name}
              onChange={onChange}
              placeholder="Bu Ani"
              className={`w-full ${errors.owner_name ? 'border-red-500' : ''}`}
            />
            {errors.owner_name && (
              <p className="mt-1 text-xs text-red-500">{errors.owner_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="established_year" className="block text-sm font-medium text-gray-700 mb-1">
              Tahun Berdiri
            </label>
            <Input
              id="established_year"
              name="established_year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.established_year}
              onChange={onChange}
              placeholder="2015"
              className={`w-full ${errors.established_year ? 'border-red-500' : ''}`}
            />
            {errors.established_year && (
              <p className="mt-1 text-xs text-red-500">{errors.established_year}</p>
            )}
          </div>
        </div>

        {/* Jumlah Karyawan */}
        <div>
          <label htmlFor="employee_count" className="block text-sm font-medium text-gray-700 mb-1">
            Jumlah Karyawan
          </label>
          <Input
            id="employee_count"
            name="employee_count"
            type="number"
            min="0"
            max="10000"
            value={formData.employee_count}
            onChange={onChange}
            placeholder="5"
            className={`w-full ${errors.employee_count ? 'border-red-500' : ''}`}
          />
          {errors.employee_count && (
            <p className="mt-1 text-xs text-red-500">{errors.employee_count}</p>
          )}
        </div>
      </div>
    </div>
  );
}
