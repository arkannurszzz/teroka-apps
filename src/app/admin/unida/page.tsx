'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, RefreshCw } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UmkmTable } from '@/features/admin/components/UmkmTable';
import { UmkmFormDialog } from '@/features/admin/components/UmkmFormDialog';
import { ImportExportButtons } from '@/features/admin/components/ImportExportButtons';
import { ProductsReviewsDialog } from '@/features/admin/components/ProductsReviewsDialog';
import { Umkm } from '@/types/umkm';
import { toast } from 'sonner';

export default function AdminUmkmPage() {
  const router = useRouter();
  const [data, setData] = useState<Umkm[]>([]);
  const [filteredData, setFilteredData] = useState<Umkm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState<Umkm | null>(null);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [manageUmkm, setManageUmkm] = useState<Umkm | null>(null);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Filter data based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(data);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = data.filter(
        (umkm) =>
          umkm.name.toLowerCase().includes(query) ||
          umkm.category.toLowerCase().includes(query) ||
          umkm.city?.toLowerCase().includes(query) ||
          umkm.province?.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/umkm');
      const result = await response.json();

      if (result.success) {
        setData(result.data || []);
      } else {
        toast.error('Gagal memuat data UMKM');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedUmkm(null);
    setIsFormOpen(true);
  };

  const handleEdit = (umkm: Umkm) => {
    setSelectedUmkm(umkm);
    setIsFormOpen(true);
  };

  const handleView = (id: string) => {
    router.push(`/umkm/${id}`);
  };

  const handleManage = (umkm: Umkm) => {
    setManageUmkm(umkm);
    setIsManageOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/umkm?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('UMKM berhasil dihapus');
        fetchData(); // Refresh data
      } else {
        toast.error(result.message || 'Gagal menghapus UMKM');
      }
    } catch (error) {
      console.error('Error deleting UMKM:', error);
      toast.error('Terjadi kesalahan saat menghapus UMKM');
    }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      const isEdit = !!selectedUmkm;
      const url = isEdit ? `/api/umkm?id=${selectedUmkm.id}` : '/api/umkm';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(isEdit ? 'UMKM berhasil diperbarui' : 'UMKM berhasil ditambahkan');
        fetchData(); // Refresh data
      } else {
        toast.error(result.message || 'Gagal menyimpan data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleImport = async (importedData: any[]) => {
    try {
      // Import data in batch
      const promises = importedData.map((item) =>
        fetch('/api/umkm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })
      );

      const results = await Promise.allSettled(promises);
      const successCount = results.filter((r) => r.status === 'fulfilled').length;
      const failCount = results.filter((r) => r.status === 'rejected').length;

      if (failCount > 0) {
        toast.warning(`${successCount} data berhasil, ${failCount} data gagal diimport`);
      } else {
        toast.success(`${successCount} data berhasil diimport`);
      }

      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error('Terjadi kesalahan saat import data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Kelola UMKM</h1>
              <p className="text-gray-600 mt-1">
                Manajemen data UMKM - Tambah, Edit, Hapus, dan Import/Export
              </p>
            </div>
            <Button
              onClick={handleCreate}
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah UMKM
            </Button>
          </div>

          <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cari nama, kategori, atau lokasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ImportExportButtons data={data} onImport={handleImport} />

              <Button
                variant="outline"
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-600 mb-1">Total UMKM</div>
            <div className="text-2xl font-bold text-gray-900">{data.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-600 mb-1">Makanan & Minuman</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.filter((u) => u.category === 'makanan' || u.category === 'minuman').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-600 mb-1">Fashion</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.filter((u) => u.category === 'fashion').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-600 mb-1">Jasa & Lainnya</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.filter((u) => u.category === 'jasa' || u.category === 'lainnya').length}
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Memuat data...</p>
          </div>
        ) : (
          <UmkmTable
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onManage={handleManage}
          />
        )}

        {/* Search Results Info */}
        {searchQuery && !loading && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Menampilkan {filteredData.length} dari {data.length} data
          </div>
        )}
      </Container>

      {/* Form Dialog */}
      <UmkmFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        umkm={selectedUmkm}
        onSubmit={handleFormSubmit}
      />

      {/* Products & Reviews Management Dialog */}
      {manageUmkm && (
        <ProductsReviewsDialog
          open={isManageOpen}
          onOpenChange={setIsManageOpen}
          umkmId={manageUmkm.id}
          umkmName={manageUmkm.name}
        />
      )}
    </div>
  );
}
