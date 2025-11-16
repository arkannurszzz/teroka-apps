import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Umkm } from '@/types/umkm';

interface UmkmHeaderProps {
  umkm: Umkm;
}

export default function UmkmHeader({ umkm }: UmkmHeaderProps) {
  // Safety check for prerendering
  if (!umkm) {
    return (
      <div className="relative w-full">
        <div className="h-52 md:h-60 bg-gray-200 animate-pulse rounded-lg overflow-hidden" />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Cover Image */}
      <div className="w-full relative h-52 md:h-60 overflow-hidden rounded-lg shadow-lg">
        <Image
          src={umkm.image || '/images/default-umkm.jpg'}
          alt={umkm.name}
          fill
          className="object-cover"
          priority
        />
        {/* Fixed Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
        
        {/* Overlay Content - Aligned as a bottom card-like section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm border-t border-white/30 p-3 md:p-5 text-white">
          <div className="w-full px-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">{umkm.name}</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3 text-sm">
              {/* Rating */}
              <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-white">
                  {umkm.rating?.toFixed(1) || '0.0'}
                </span>
                <span className="text-white/80">
                  ({umkm.total_reviews || 0} ulasan)
                </span>
              </div>
              {/* Location */}
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate">{umkm.location || umkm.city || 'Lokasi tidak tersedia'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}