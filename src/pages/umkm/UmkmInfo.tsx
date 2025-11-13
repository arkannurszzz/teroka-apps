import { MapPin, Phone, Clock, Utensils, Coffee, Wrench, Shirt, Globe, Instagram, Facebook } from 'lucide-react';

import { Umkm } from '@/types/umkm';
import { Card } from '@/components/ui';

interface UmkmInfoProps {
  umkm: Umkm;
}

// Category icons mapping
const categoryIcons = {
  makanan: Utensils,
  minuman: Coffee,
  jasa: Wrench,
  fashion: Shirt,
};

export default function UmkmInfo({ umkm }: UmkmInfoProps) {
  // Safety check for prerendering
  if (!umkm) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  const Icon = categoryIcons[umkm.category.toLowerCase() as keyof typeof categoryIcons] || Utensils;

  return (
    <div className="space-y-6">
      {/* Main Info Card */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Informasi Toko</h2>

        <div className="space-y-4">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Deskripsi</h3>
            <p className="text-gray-600 leading-relaxed">
              {umkm.description}
            </p>
          </div>

          {/* Category */}
          <div>
            <h3 className="font-semibold mb-2">Kategori</h3>
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg w-fit">
              <Icon className="w-4 h-4" />
              <span className="capitalize">{umkm.category}</span>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-2">Lokasi</h3>
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-5 h-5 mt-0.5 text-red-500" />
              <span>{umkm.location}</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-2">Kontak</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5 text-red-500" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-red-500" />
                <span>Buka: 08:00 - 21:00</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-2">Media Sosial</h3>
            <div className="flex gap-3">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Instagram className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Facebook className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Globe className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">4.5</div>
          <div className="text-sm text-gray-600">Rating</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">124</div>
          <div className="text-sm text-gray-600">Ulasan</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">2+ Tahun</div>
          <div className="text-sm text-gray-600">Bergabung</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">500+</div>
          <div className="text-sm text-gray-600">Pelanggan</div>
        </Card>
      </div>
    </div>
  );
}