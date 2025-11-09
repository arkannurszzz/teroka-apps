import { Input } from '@/components/ui/input';
import type { UmkmFormData, FormErrors } from '../types';

interface LocationSectionProps {
  formData: UmkmFormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LocationSection({ formData, errors, onChange }: LocationSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        Lokasi
      </h2>

      <div className="space-y-4">
        {/* Alamat */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Alamat Lengkap <span className="text-red-500">*</span>
          </label>
          <Input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={onChange}
            placeholder="Jl. Merdeka No. 123"
            className={`w-full ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500">{errors.address}</p>
          )}
        </div>

        {/* Kota & Provinsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Kota/Kabupaten <span className="text-red-500">*</span>
            </label>
            <Input
              id="city"
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={onChange}
              placeholder="Jakarta"
              className={`w-full ${errors.city ? 'border-red-500' : ''}`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
              Provinsi <span className="text-red-500">*</span>
            </label>
            <Input
              id="province"
              name="province"
              type="text"
              required
              value={formData.province}
              onChange={onChange}
              placeholder="DKI Jakarta"
              className={`w-full ${errors.province ? 'border-red-500' : ''}`}
            />
            {errors.province && (
              <p className="mt-1 text-xs text-red-500">{errors.province}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
