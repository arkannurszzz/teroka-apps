import { motion } from 'framer-motion';
import { UmkmCard } from '@/components/shared/UmkmCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Umkm } from '@/types/umkm';
import { useState } from 'react';

type Category = 'semua' | 'makanan' | 'minuman' | 'jasa' | 'fashion';

interface ResultsProps {
  filteredUmkm: Umkm[];
  searchQuery: string;
  selectedCategory: Category;
  loading: boolean;
  error: string | null;
  locationEnabled: boolean;
}

const categoryConfig: Record<Category, { label: string }> = {
  semua: { label: 'Semua' },
  makanan: { label: 'Makanan' },
  minuman: { label: 'Minuman' },
  jasa: { label: 'Jasa' },
  fashion: { label: 'Fashion' },
};

export default function Results({
  filteredUmkm,
  searchQuery,
  selectedCategory,
  loading,
  error,
  locationEnabled,
}: ResultsProps) {
  const [visibleCount, setVisibleCount] = useState(10);
  const ITEMS_PER_PAGE = 10;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const displayItems = filteredUmkm ? filteredUmkm.slice(0, visibleCount) : [];

  // Testing: Selalu tampilkan button jika ada data (minimal 1 item)
  const shouldShowButton = filteredUmkm && filteredUmkm.length > 0;

  const getTitle = (): string => {
    if (searchQuery) return ''; // Kosongkan judul saat pencarian aktif
    if (selectedCategory === 'semua') return 'Semua UMKM Lokal';
    if (!selectedCategory || !categoryConfig[selectedCategory]) return 'Hasil Pencarian';
    return `Kategori ${categoryConfig[selectedCategory].label}`;
  };

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center"
        >
          <span className="text-2xl">🔍</span>
        </motion.div>
      </div>
      <p className="text-lg font-medium text-gray-600 mb-2">
        {searchQuery || selectedCategory !== 'semua'
          ? 'Tidak ada UMKM yang cocok.'
          : 'Belum ada data UMKM.'}
      </p>
      <p className="text-sm text-gray-500">
        Coba ubah kata kunci atau pilih kategori lain.
      </p>
    </div>
  );

  const renderLoading = () => (
    <div className="py-12 flex justify-center items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <span className="ml-2 text-gray-500">Memuat UMKM...</span>
    </div>
  );

  const renderError = () => (
    <div className="py-12 text-center">
      <div className="mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"
        >
          <span className="text-2xl">⚠️</span>
        </motion.div>
      </div>
      <p className="text-lg font-medium text-red-600 mb-2">Terjadi kesalahan</p>
      <p className="text-sm text-red-500">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Muat Ulang
      </button>
    </div>
  );

  return (
    <Container className="py-6 md:py-8 lg:py-10">
      {/* Judul dinamis */}
      {getTitle() && <SectionTitle title={getTitle()} className="mb-8" />}

      {/* Loading State */}
      {loading && renderLoading()}

      {/* Error State */}
      {error && renderError()}

      {/* Empty State */}
      {!loading && !error && (!filteredUmkm || filteredUmkm.length === 0) && renderEmptyState()}

      {/* Grid Hasil */}
      {!loading && !error && filteredUmkm && filteredUmkm.length > 0 && (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {displayItems.map((umkm, index) => (
              <motion.div
                key={umkm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="w-full"
              >
                <UmkmCard
                  id={umkm.id}
                  name={umkm.name}
                  category={umkm.category}
                  image={umkm.image}
                  location={umkm.location}
                />
              </motion.div>
            ))}
          </div>

          {/* Load More Button - Testing: Always show if there's data */}
          {shouldShowButton && (
            <div className="text-center mt-8">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-3 text-base font-medium"
              >
                Tampilkan Lebih Banyak
              </Button>
            </div>
          )}
        </>
      )}

      {/* Lokasi Info */}
      {locationEnabled && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-green-600 font-medium flex items-center justify-center gap-1"
        >
          <span className="text-xs">📍</span>
          Menampilkan UMKM di sekitar lokasi Anda
        </motion.p>
      )}
    </Container>
  );
}