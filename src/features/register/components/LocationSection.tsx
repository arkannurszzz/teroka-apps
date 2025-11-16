import { Input } from '@/components/ui/input';
import type { UmkmFormData, FormErrors } from '../types';
import { useProvinces, useRegencies, useDistricts } from '@/hooks/useWilayah';

interface LocationSectionProps {
  formData: UmkmFormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onWilayahChange: (field: 'province' | 'city' | 'district', id: string, name: string) => void;
}

export function LocationSection({ formData, errors, onChange, onWilayahChange }: LocationSectionProps) {
  const { provinces, loading: loadingProvinces } = useProvinces();
  const { regencies, loading: loadingRegencies } = useRegencies(formData.province_id);
  const { districts, loading: loadingDistricts } = useDistricts(formData.city_id);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvince = provinces.find(p => p.id === e.target.value);
    if (selectedProvince) {
      onWilayahChange('province', selectedProvince.id, selectedProvince.name);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = regencies.find(r => r.id === e.target.value);
    if (selectedCity) {
      onWilayahChange('city', selectedCity.id, selectedCity.name);
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = districts.find(d => d.name === e.target.value);
    if (selectedDistrict) {
      onWilayahChange('district', selectedDistrict.id, selectedDistrict.name);
    } else {
      // Handle case when value is empty (placeholder)
      onWilayahChange('district', '', '');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        Lokasi
      </h2>

      <div className="space-y-4">
        {/* Provinsi */}
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
            Provinsi <span className="text-red-500">*</span>
          </label>
          <select
            id="province"
            name="province_id"
            required
            value={formData.province_id}
            onChange={handleProvinceChange}
            disabled={loadingProvinces}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.province ? 'border-red-500' : 'border-gray-300'
            } ${loadingProvinces ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            <option value="">
              {loadingProvinces ? 'Memuat provinsi...' : 'Pilih Provinsi'}
            </option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="mt-1 text-xs text-red-500">{errors.province}</p>
          )}
        </div>

        {/* Kota/Kabupaten */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Kota/Kabupaten <span className="text-red-500">*</span>
          </label>
          <select
            id="city"
            name="city_id"
            required
            value={formData.city_id}
            onChange={handleCityChange}
            disabled={!formData.province_id || loadingRegencies}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            } ${
              !formData.province_id || loadingRegencies ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          >
            <option value="">
              {!formData.province_id
                ? 'Pilih provinsi terlebih dahulu'
                : loadingRegencies
                ? 'Memuat kota...'
                : 'Pilih Kota/Kabupaten'}
            </option>
            {regencies.map((regency) => (
              <option key={regency.id} value={regency.id}>
                {regency.name}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city}</p>
          )}
        </div>

        {/* Kecamatan */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
            Kecamatan <span className="text-red-500">*</span>
          </label>
          <select
            id="district"
            name="district"
            required
            value={formData.district}
            onChange={handleDistrictChange}
            disabled={!formData.city_id || loadingDistricts}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.district ? 'border-red-500' : 'border-gray-300'
            } ${
              !formData.city_id || loadingDistricts ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          >
            <option value="">
              {!formData.city_id
                ? 'Pilih kota terlebih dahulu'
                : loadingDistricts
                ? 'Memuat kecamatan...'
                : 'Pilih Kecamatan'}
            </option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="mt-1 text-xs text-red-500">{errors.district}</p>
          )}
        </div>

        {/* Alamat Lengkap */}
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
            placeholder="Jl. Merdeka No. 123, RT/RW 001/002"
            className={`w-full ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500">{errors.address}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Isi dengan nama jalan, nomor rumah, RT/RW
          </p>
        </div>
      </div>
    </div>
  );
}
