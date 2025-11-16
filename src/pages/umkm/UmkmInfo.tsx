import React from 'react';
import { MapPin, Phone, Clock, Utensils, Coffee, Wrench, Shirt, Globe, Users, Calendar, TrendingUp, MessageCircle } from 'lucide-react';
import { Umkm } from '@/types/umkm';
import { Card } from '@/components/ui';

interface UmkmInfoProps {
  umkm: Umkm;
}

// Custom Google Maps Component using React refs
function CustomGoogleMaps({ mapsHtml }: { mapsHtml: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (containerRef.current && mapsHtml) {
      containerRef.current.innerHTML = mapsHtml;
    }
  }, [mapsHtml]);

  return (
    <div
      ref={containerRef}
      className="w-full h-80 rounded-lg overflow-hidden shadow-sm"
    />
  );
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">Informasi Toko</h2>
        
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">Deskripsi</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {umkm.description}
            </p>
          </div>

          {/* Category */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">Kategori</h3>
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full w-fit shadow-sm">
              <Icon className="w-4 h-4" />
              <span className="capitalize font-medium">{umkm.category}</span>
            </div>
          </div>

          {/* Contact & Social Media - Moved up for prominence */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500" />
              Kontak & Media Sosial
            </h3>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              {/* Contact Information */}
              {umkm.contact && (
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Phone className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-medium">{umkm.contact}</span>
                </div>
              )}
              {umkm.operating_hours && (
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Clock className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-medium">Buka: {umkm.operating_hours}</span>
                </div>
              )}
              {/* Social Media - Enhanced with better layout */}
              <div className="flex gap-3 pt-2">
                <button className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
                  <Globe className="w-5 h-5 text-gray-700" />
                </button>
                {/* Add more social buttons if data available; placeholders for now */}
                {/* Example: if (umkm.instagram) <button><Instagram className="..." /></button> */}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              Lokasi
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Address Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 mt-0.5 text-red-500 shrink-0" />
                  <div>
                    <p className="font-medium">{umkm.address || umkm.location}</p>
                    {umkm.city && umkm.province && (
                      <p className="text-sm text-gray-500 mt-1">
                        {umkm.city}, {umkm.province}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Google Maps */}
              <div>
                {umkm.google_maps_link ? (
                  <CustomGoogleMaps mapsHtml={umkm.google_maps_link} />
                ) : (
                  <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        ⚠️ Google Maps belum ditambahkan
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats - Improved with better spacing and hover effects */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
            <div className="text-2xl font-bold text-red-600">
              {umkm.rating?.toFixed(1) || '0.0'}
            </div>
          </div>
          <div className="text-sm text-gray-600 font-medium">Rating</div>
        </Card>
        <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-center mb-2">
            <MessageCircle className="w-5 h-5 text-red-600 mr-2" />
            <div className="text-2xl font-bold text-red-600">
              {umkm.total_reviews || 0}
            </div>
          </div>
          <div className="text-sm text-gray-600 font-medium">Ulasan</div>
        </Card>
        <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-red-600 mr-2" />
            <div className="text-2xl font-bold text-red-600">
              {umkm.established_year ? `${new Date().getFullYear() - umkm.established_year}+` : 'Baru'}
            </div>
          </div>
          <div className="text-sm text-gray-600 font-medium">Tahun</div>
        </Card>
        <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-red-600 mr-2" />
            <div className="text-2xl font-bold text-red-600">
              {umkm.total_customers ? (umkm.total_customers >= 1000 ? `${(umkm.total_customers / 1000).toFixed(1)}k+` : `${umkm.total_customers}+`) : '0+'}
            </div>
          </div>
          <div className="text-sm text-gray-600 font-medium">Pelanggan</div>
        </Card>
      </div>
    </div>
  );
}