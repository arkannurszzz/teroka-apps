import { motion } from 'framer-motion';

import { UmkmCard } from '@/components/shared/UmkmCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/ui';

import { Umkm } from '@/types/umkm';

type Category = 'semua' | 'makanan' | 'minuman' | 'jasa' | 'fashion';

interface ResultsProps {
  filteredUmkm: Umkm[];
  searchQuery: string;
  selectedCategory: Category;
  loading: boolean;
  error: string | null;
  locationEnabled: boolean;
}

const categoryConfig: Record<
  Category,
  { label: string }
> = {
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
  const getTitle = () => {
    if (searchQuery) {
      return `Hasil untuk "${searchQuery}"`;
    }
    if (selectedCategory === 'semua') {
      return 'Semua UMKM Lokal';
    }
    // Safety check for prerendering
    if (!selectedCategory || !categoryConfig[selectedCategory]) {
      return 'Hasil Pencarian';
    }
    return `Kategori ${categoryConfig[selectedCategory].label}`;
  };

  return (
    <Container className="py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
      <SectionTitle title={getTitle()} className="mb-8" />

      {loading && (
        <p className="text-center text-gray-500 animate-pulse">Memuat UMKM...</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && (!filteredUmkm || filteredUmkm.length === 0) && (
        <p className="text-center text-gray-500">
          {searchQuery || selectedCategory !== 'semua'
            ? 'Tidak ada UMKM yang cocok.'
            : 'Belum ada data UMKM.'}
        </p>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        {filteredUmkm?.map((umkm, index) => (
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

  
      {locationEnabled && (
        <p className="mt-8 text-center text-sm text-green-600 font-medium">
          Menampilkan UMKM di sekitar lokasi Anda
        </p>
      )}
    </Container>
  );
}