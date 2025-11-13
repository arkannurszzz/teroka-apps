'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SearchBar } from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onLocationClick: () => void;
}

export default function Hero({ searchQuery, onSearchChange, onLocationClick }: HeroProps) {
  return (
    <section
      className="relative h-96 md:h-[500px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url('/images/market-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
        >
          Jelajahi UMKM di Sekitarmu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-100 mb-8"
        >
          Temukan produk lokal terbaik di sekitar kamu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl mx-auto mb-6"
        >
          <SearchBar
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari makanan, layanan, atau nama usaha"
            className="bg-white rounded-full shadow-xl text-gray-800 py-3 px-5 text-base"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onLocationClick}
            size="lg"
            className="rounded-full bg-white/95 hover:bg-white text-red-600 font-semibold shadow-lg px-6 py-6 flex items-center mx-auto"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Gunakan Lokasiku
          </Button>
        </motion.div>
      </div>
    </section>
  );
}