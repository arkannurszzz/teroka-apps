import { Input } from '@/components/ui/input';
import type { UmkmFormData, FormErrors } from '../types';

interface BasicInfoSectionProps {
  formData: UmkmFormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function BasicInfoSection({ formData, errors, onChange }: BasicInfoSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        Informasi Dasar
      </h2>

      <div className="space-y-4">
        {/* Nama UMKM */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nama UMKM <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={onChange}
            placeholder="Contoh: Warung Nasi Bu Ani"
            className={`w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
            <option value="jasa">Jasa</option>
            <option value="fashion">Fashion</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi Bisnis
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={onChange}
            placeholder="Ceritakan tentang bisnis Anda..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
    </div>
  );
}
