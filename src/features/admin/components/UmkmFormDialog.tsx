'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Umkm } from '@/types/umkm';
import { useProvinces, useRegencies, useDistricts } from '@/hooks/useWilayah';

interface UmkmFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  umkm?: Umkm | null;
  onSubmit: (data: any) => Promise<void>;
}

const CATEGORIES = [
  { value: 'makanan', label: 'Makanan' },
  { value: 'minuman', label: 'Minuman' },
  { value: 'jasa', label: 'Jasa' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'lainnya', label: 'Lainnya' },
];

export function UmkmFormDialog({ open, onOpenChange, umkm, onSubmit }: UmkmFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
    operating_hours: '08:00-17:00',
    owner_name: '',
    established_year: '',
    employee_count: '',
    image: '',
  });

  const { provinces } = useProvinces();
  const { regencies } = useRegencies(formData.province_id);
  const { districts } = useDistricts(formData.city_id);

  // Populate form when editing
  useEffect(() => {
    if (umkm) {
      setFormData({
        name: umkm.name || '',
        category: umkm.category || 'makanan',
        description: umkm.description || '',
        address: umkm.address || '',
        province_id: '', // We don't have province_id in Umkm type
        province: umkm.province || '',
        city_id: '', // We don't have city_id in Umkm type
        city: umkm.city || '',
        district: '',
        contact: umkm.contact || '',
        operating_hours: umkm.operating_hours || '08:00-17:00',
        owner_name: umkm.owner_name || '',
        established_year: umkm.established_year?.toString() || '',
        employee_count: umkm.employee_count?.toString() || '',
        image: umkm.image || '',
      });
    } else {
      // Reset form for new UMKM
      setFormData({
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
        operating_hours: '08:00-17:00',
        owner_name: '',
        established_year: '',
        employee_count: '',
        image: '',
      });
    }
  }, [umkm, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvince = provinces.find(p => p.id === e.target.value);
    if (selectedProvince) {
      setFormData(prev => ({
        ...prev,
        province_id: selectedProvince.id,
        province: selectedProvince.name,
        city_id: '',
        city: '',
        district: '',
      }));
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = regencies.find(r => r.id === e.target.value);
    if (selectedCity) {
      setFormData(prev => ({
        ...prev,
        city_id: selectedCity.id,
        city: selectedCity.name,
        district: '',
      }));
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = districts.find(d => d.id === e.target.value);
    if (selectedDistrict) {
      setFormData(prev => ({
        ...prev,
        district: selectedDistrict.name,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        established_year: formData.established_year ? parseInt(formData.established_year) : null,
        employee_count: formData.employee_count ? parseInt(formData.employee_count) : 0,
      };

      await onSubmit(submitData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="2xl">
        <DialogHeader>
          <DialogTitle>{umkm ? 'Edit UMKM' : 'Tambah UMKM Baru'}</DialogTitle>
          <DialogDescription>
            {umkm
              ? 'Perbarui informasi UMKM di bawah ini'
              : 'Isi informasi UMKM dengan lengkap dan benar'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-6 max-h-[65vh] overflow-y-auto px-6">
            {/* Informasi Dasar */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-gray-800 border-b pb-2 -mx-1">
                Informasi Dasar
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nama UMKM <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Warung Makan Ibu Siti"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Deskripsi singkat tentang UMKM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">
                  URL Gambar
                </label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Lokasi */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-gray-800 border-b pb-2 -mx-1">Lokasi</h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="province" className="block text-sm font-medium mb-1">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="province"
                    name="province_id"
                    required
                    value={formData.province_id}
                    onChange={handleProvinceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Pilih Provinsi</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">
                    Kota/Kabupaten <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    name="city_id"
                    required
                    value={formData.city_id}
                    onChange={handleCityChange}
                    disabled={!formData.province_id}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                  >
                    <option value="">Pilih Kota</option>
                    {regencies.map((regency) => (
                      <option key={regency.id} value={regency.id}>
                        {regency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="district" className="block text-sm font-medium mb-1">
                    Kecamatan
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleDistrictChange}
                    disabled={!formData.city_id}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                  >
                    <option value="">Pilih Kecamatan</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <Input
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Jl. Merdeka No. 123, RT/RW 001/002"
                />
              </div>
            </div>

            {/* Kontak & Operasional */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-gray-800 border-b pb-2 -mx-1">
                Kontak & Operasional
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium mb-1">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="contact"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="628123456789"
                  />
                </div>

                <div>
                  <label htmlFor="operating_hours" className="block text-sm font-medium mb-1">
                    Jam Operasional <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="operating_hours"
                    name="operating_hours"
                    required
                    value={formData.operating_hours}
                    onChange={handleChange}
                    placeholder="08:00-17:00"
                  />
                </div>
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-gray-800 border-b pb-2 -mx-1">
                Informasi Tambahan
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="owner_name" className="block text-sm font-medium mb-1">
                    Nama Pemilik
                  </label>
                  <Input
                    id="owner_name"
                    name="owner_name"
                    value={formData.owner_name}
                    onChange={handleChange}
                    placeholder="Nama pemilik UMKM"
                  />
                </div>

                <div>
                  <label htmlFor="established_year" className="block text-sm font-medium mb-1">
                    Tahun Berdiri
                  </label>
                  <Input
                    id="established_year"
                    name="established_year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.established_year}
                    onChange={handleChange}
                    placeholder="2020"
                  />
                </div>

                <div>
                  <label htmlFor="employee_count" className="block text-sm font-medium mb-1">
                    Jumlah Karyawan
                  </label>
                  <Input
                    id="employee_count"
                    name="employee_count"
                    type="number"
                    min="0"
                    value={formData.employee_count}
                    onChange={handleChange}
                    placeholder="5"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Menyimpan...' : umkm ? 'Simpan Perubahan' : 'Tambah UMKM'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
