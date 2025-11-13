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
      <div className="relative">
        <div className="h-64 md:h-80 bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={umkm.image || '/images/default-umkm.jpg'}
          alt={umkm.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{umkm.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.5</span>
                <span className="text-white/70">(124 ulasan)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{umkm.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}