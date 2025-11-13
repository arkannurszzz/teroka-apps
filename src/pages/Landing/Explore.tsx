'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface UmkmPreview {
  id: string;
  name: string;
  category: string;
  image: string;
  city: string;
}

interface UmkmApiResponse {
  id: string;
  name: string;
  category: string;
  image?: string;
  city: string;
}

export default function Explore() {
  const [umkmList, setUmkmList] = useState<UmkmPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false); // State untuk pause control

  useEffect(() => {
    async function fetchUmkm() {
      try {
        const response = await fetch('/api/umkm');
        const result = await response.json();
        if (result.success) {
          // Get first 8 UMKM for the explore section
          const umkmData = result.data.slice(0, 8).map((umkm: UmkmApiResponse) => ({
            id: umkm.id,
            name: umkm.name,
            category: umkm.category,
            image: umkm.image || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80',
            city: umkm.city
          }));
          setUmkmList(umkmData);
        }
      } catch (error) {
        console.error('Error fetching UMKM:', error);
        // Fallback to placeholder images
        setUmkmList([
          { id: '1', name: 'UMKM 1', category: 'makanan', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80', city: 'Jakarta' },
          { id: '2', name: 'UMKM 2', category: 'minuman', image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&q=80', city: 'Bandung' },
          { id: '3', name: 'UMKM 3', category: 'jasa', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80', city: 'Surabaya' },
          { id: '4', name: 'UMKM 4', category: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80', city: 'Yogyakarta' },
          { id: '5', name: 'UMKM 5', category: 'makanan', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80', city: 'Semarang' },
          { id: '6', name: 'UMKM 6', category: 'minuman', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', city: 'Solo' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchUmkm();
  }, []);

  // Create items for marquee - ensure we have at least 8 items for smooth scrolling
  const marqueeItems = umkmList.length > 0 ? umkmList : [];
  const displayUmkm = [...marqueeItems, ...marqueeItems];

  // Handler untuk pause/resume
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Jelajah Segala Rupa Karya Lokal
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Jelajahi segala rupa karya lokal
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Jelajah Segala Rupa Karya Lokal
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Temukan UMKM terbaik di berbagai kategori
          </p>
        </motion.div>
        {/* Marquee container for smooth infinite scroll */}
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`flex animate-marquee whitespace-nowrap ${isPaused ? 'paused' : ''}`}
            style={{ animationDuration: '15s' }}
          >
            {/* First set of UMKM items */}
            {displayUmkm.map((umkm, index) => (
              <Link
                key={`${umkm.id}-${index}`}
                href={`/umkm/${umkm.id}`}
                className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md mx-2 md:mx-3"
              >
                <Image
                  src={umkm.image}
                  alt={umkm.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{umkm.name}</h3>
                  <p className="text-sm opacity-90 capitalize">{umkm.category} • {umkm.city}</p>
                </div>
              </Link>
            ))}
            {/* Second set of UMKM items for seamless loop */}
            {displayUmkm.map((umkm, index) => (
              <Link
                key={`${umkm.id}-${index}-duplicate`}
                href={`/umkm/${umkm.id}`}
                className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md mx-2 md:mx-3"
              >
                <Image
                  src={umkm.image}
                  alt={umkm.name}
                  fill

                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{umkm.name}</h3>
                  <p className="text-sm opacity-90 capitalize">{umkm.category} • {umkm.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/search"
            className="inline-flex items-center bg-linear-to-r from-[#D9302C] to-[#f04c24] hover:from-[#f04c24] hover:to-[#D9302C] text-white font-semibold py-3 px-8 rounded-full text-base transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Lihat Semua UMKM
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}