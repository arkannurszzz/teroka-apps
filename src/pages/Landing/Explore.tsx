'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface UmkmPreview {
  id: string;
  name: string;
  category: string;
  image: string;
  city: string;
}

export default function Explore() {
  const [umkmList, setUmkmList] = useState<UmkmPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        const response = await fetch('/api/umkm');
        const result = await response.json();

        if (result.success) {
          // Get first 8 UMKM for the explore section
          const umkmData = result.data.slice(0, 8).map((umkm: any) => ({
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

  // Duplicate array for infinite scroll effect
  const displayUmkm = [...umkmList, ...umkmList];

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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Jelajah Segala Rupa Karya Lokal
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Temukan UMKM terbaik di berbagai kategori
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-6 min-w-max animate-scroll-left md:animate-scroll-left-md">
            {displayUmkm.map((umkm, index) => (
              <Link
                key={`${umkm.id}-${index}`}
                href={`/umkm/${umkm.id}`}
                className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md group"
              >
                <Image
                  src={umkm.image}
                  alt={umkm.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{umkm.name}</h3>
                  <p className="text-sm opacity-90 capitalize">{umkm.category} • {umkm.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/search"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Lihat Semua UMKM
          </Link>
        </div>
      </div>
    </section>
  );
}
