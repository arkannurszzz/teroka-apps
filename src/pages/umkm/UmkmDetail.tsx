'use client';

import { useState } from 'react';
import { ArrowLeft, MessageCircle, Heart, Share2 } from 'lucide-react';

import { Umkm } from '@/types/umkm';
import { Container } from '@/components/ui';
import { Button } from '@/components/ui/button';
import UmkmHeader from './UmkmHeader';
import UmkmInfo from './UmkmInfo';
import UmkmProducts from './UmkmProducts';
import UmkmReviews from './UmkmReviews';

interface UmkmDetailProps {
  umkm: Umkm;
}

export default function UmkmDetail({ umkm }: UmkmDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Safety check for prerendering
  if (!umkm) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  const handleBack = () => {
    window.history.back();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: umkm.name,
          text: umkm.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavorite}
                className={`p-2 ${isFavorite ? 'text-red-600' : 'text-gray-600'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="p-2 text-gray-600"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <UmkmHeader umkm={umkm} />

      <Container className="py-6 space-y-8">
        <UmkmInfo umkm={umkm} />
        <UmkmProducts umkmId={umkm.id} />
        <UmkmReviews umkmId={umkm.id} />
      </Container>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <Container>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 flex items-center gap-2 border-red-600 text-red-600 hover:bg-red-50"
            >
              <MessageCircle className="w-5 h-5" />
              Chat
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Kunjungi Toko
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}