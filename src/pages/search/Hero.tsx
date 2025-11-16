'use client';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { SearchBar } from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onLocationClick: () => void;
}

export default function Hero({ searchQuery, onSearchChange, onLocationClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] bg-gray-50 overflow-hidden flex items-center justify-center">
      {/* Background image dengan warna asli 100%, tanpa overlay gelap agar sesuai original JPEG */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/search/searchpage.jpeg')` }}
      />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 md:space-y-6 lg:space-y-8"
        >
          {/* Headline dengan drop-shadow lebih kuat untuk kejelasan tanpa ubah warna bg */}
          <motion.h1
            variants={childVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-tight"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)', // Shadow tebal untuk kontras tinggi
            }}
          >
            Jelajahi UMKM
            <span className="block text-red-600" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              di Sekitarmu
            </span>
          </motion.h1>
          {/* Search bar dengan bg lebih opaque untuk kontras */}
          <motion.div
            variants={childVariants}
            className="w-full max-w-2xl mx-auto space-y-3"
          >
            {/* Search input */}
            <div className="relative">
              <SearchBar
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari UMKM atau produk lokal..."
                className="w-full bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 py-4 px-5 text-base focus:border-red-400 focus:ring-2 focus:ring-red-200/50 transition-all duration-300 pr-12"
                aria-label="Cari UMKM di sekitar"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {/* Location button */}
            <Button
              onClick={onLocationClick}
              variant="outline"
              size="md"
              className="w-auto min-w-[140px] max-w-[200px] mx-auto rounded-full bg-white/95 hover:bg-white text-gray-700 backdrop-blur-md px-4 sm:px-8 py-1.5 sm:py-3 flex items-center justify-center transition-all duration-300 gap-2 sm:gap-3 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl border-gray-200 text-xs sm:text-base whitespace-nowrap"
              aria-label="Gunakan lokasi saat ini"
            >
              <MapPin className="w-3 h-3 sm:w-5 sm:h-5 shrink-0 text-red-500" />
              <span className="font-semibold">Gunakan Lokasiku</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}