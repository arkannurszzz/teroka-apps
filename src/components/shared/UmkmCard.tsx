// src/components/shared/UmkmCard.tsx
import Link from 'next/link';
import { Card } from '@/components/ui';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Utensils, Coffee, Wrench, Shirt } from 'lucide-react';

interface UmkmCardProps {
  id: string;
  name: string;
  category: string;
  image: string | null;
  location: string;
  rating?: number;
  distance?: number;
}

// PERBAIKAN: Tambahkan tipe SVG props agar className diterima
const categoryIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  makanan: Utensils,
  minuman: Coffee,
  jasa: Wrench,
  fashion: Shirt,
};

export function UmkmCard({
  id,
  name,
  category,
  image,
  location,
  rating = 4.5,
  distance = Math.random() * 2 + 0.1,
}: UmkmCardProps) {
  const Icon = categoryIcons[category.toLowerCase()] || Utensils;

  return (
    <Link href={`/umkm/${id}`} className="block">
      <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Gambar + Rating Badge */}
        <div className="relative">
          {image && image.trim() !== '' ? (
            <Image
              src={image}
              alt={name}
              width={300}
              height={200}
              className="w-full h-40 object-cover"
              onError={(e) => {
                // Debug: Log error untuk troubleshooting
                const target = e.target as HTMLImageElement;
                console.log('❌ Image load error for', name, ':', {
                  imageUrl: image,
                  src: target.src,
                  error: 'Failed to load image'
                });
                
                // Fallback jika image gagal dimuat
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-40 bg-gray-200 flex items-center justify-center';
                  fallback.innerHTML = `
                    <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  `;
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold shadow-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            {rating.toFixed(1)}
          </div>
        </div>

        {/* Konten */}
        <div className="p-3">
          <h3 className="font-bold text-sm line-clamp-2 mb-1">{name}</h3>

          {/* Kategori + Ikon */}
          <div className="flex items-center gap-1.5 mb-1">
            <Icon className="w-3.5 h-3.5 text-red-600" />
            <span className="text-xs font-medium text-gray-700 capitalize">
              {category}
            </span>
          </div>

          {/* Lokasi + Jarak */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              {location}
            </span>
            <span className="font-medium text-red-600">
              {distance.toFixed(1)} km
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}