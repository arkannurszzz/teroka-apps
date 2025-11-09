'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'makanan',
    description: '',
    address: '',
    city: '',
    province: '',
    contact: '',
    operating_hours: '',
    image: '',
    owner_name: '',
    established_year: '',
    employee_count: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        established_year: formData.established_year ? parseInt(formData.established_year) : null,
        employee_count: formData.employee_count ? parseInt(formData.employee_count) : 0,
      };

      const response = await fetch('/api/umkm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        // Reset form
        setFormData({
          name: '',
          category: 'makanan',
          description: '',
          address: '',
          city: '',
          province: '',
          contact: '',
          operating_hours: '',
          image: '',
          owner_name: '',
          established_year: '',
          employee_count: '',
        });
        // Redirect to search page after 2 seconds
        setTimeout(() => {
          router.push('/search');
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Daftarkan UMKM Anda
            </h1>
            <p className="text-lg text-gray-600">
              Bergabunglah dengan Teroka dan tingkatkan visibilitas bisnis Anda
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informasi Dasar */}
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
                      onChange={handleChange}
                      placeholder="Contoh: Warung Nasi Bu Ani"
                      className="w-full"
                    />
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      placeholder="Ceritakan tentang bisnis Anda..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Lokasi */}
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
                      onChange={handleChange}
                      placeholder="Jl. Merdeka No. 123"
                      className="w-full"
                    />
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
                        onChange={handleChange}
                        placeholder="Jakarta"
                        className="w-full"
                      />
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
                        onChange={handleChange}
                        placeholder="DKI Jakarta"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontak */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b">
                  Informasi Kontak
                </h2>

                <div className="space-y-4">
                  {/* Nomor Telepon */}
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                      Nomor Telepon/WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="contact"
                      name="contact"
                      type="tel"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+62812345678"
                      className="w-full"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Format: +62 diikuti nomor telepon
                    </p>
                  </div>

                  {/* Jam Operasional */}
                  <div>
                    <label htmlFor="operating_hours" className="block text-sm font-medium text-gray-700 mb-1">
                      Jam Operasional <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="operating_hours"
                      name="operating_hours"
                      type="text"
                      required
                      value={formData.operating_hours}
                      onChange={handleChange}
                      placeholder="08:00-21:00"
                      className="w-full"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Contoh: 08:00-21:00 atau Senin-Sabtu 09:00-18:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Informasi Tambahan */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b">
                  Informasi Tambahan (Opsional)
                </h2>

                <div className="space-y-4">
                  {/* URL Gambar */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                      URL Foto/Logo UMKM
                    </label>
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Masukkan URL gambar dari internet
                    </p>
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
                        onChange={handleChange}
                        placeholder="Bu Ani"
                        className="w-full"
                      />
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
                        onChange={handleChange}
                        placeholder="2015"
                        className="w-full"
                      />
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
                      value={formData.employee_count}
                      onChange={handleChange}
                      placeholder="5"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Mendaftar...</span>
                      </div>
                    ) : (
                      'Daftarkan UMKM'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">=Ý Catatan Penting:</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Pastikan semua informasi yang diisi sudah benar</li>
              <li>Data UMKM Anda akan ditinjau oleh tim kami terlebih dahulu</li>
              <li>Setelah disetujui, UMKM Anda akan muncul di halaman pencarian</li>
              <li>Anda dapat menghubungi kami jika ada pertanyaan</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
