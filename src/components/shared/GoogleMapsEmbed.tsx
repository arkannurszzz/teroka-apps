import { MapPin, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GoogleMapsEmbedProps {
  mapsLink?: string;
  address?: string;
  className?: string;
}

export default function GoogleMapsEmbed({ mapsLink, address, className = '' }: GoogleMapsEmbedProps) {
  console.log('🗺️ GoogleMapsEmbed called with:', {
    hasMapsLink: !!mapsLink,
    mapsLinkLength: mapsLink?.length || 0,
    address,
    className
  });

  if (!mapsLink) {
    console.log('🗺️ No mapsLink provided, returning null');
    return null;
  }

  // Extract URL from iframe
  let embedUrl = mapsLink;
  let isIframe = false;

  if (mapsLink.includes('<iframe')) {
    isIframe = true;
    const srcMatch = mapsLink.match(/src="([^"]+)"/);
    if (srcMatch) {
      embedUrl = srcMatch[1];
      console.log('🗺️ Extracted iframe src:', embedUrl.substring(0, 100) + '...');
    } else {
      console.log('🗺️ Could not extract iframe src');
    }
  }

  console.log('🗺️ Final embedUrl:', embedUrl.substring(0, 100) + '...');

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold">Lokasi</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log('🗺️ Opening maps URL:', embedUrl);
              window.open(embedUrl, '_blank');
            }}
            className="flex items-center gap-1 text-gray-600 hover:text-red-600"
          >
            <ExternalLink className="w-4 h-4" />
            Buka di Maps
          </Button>
        </div>
      </div>

      <div className="relative w-full h-64 bg-gray-100">
        {isIframe ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title={`Lokasi ${address || 'Toko'}`}
            onLoad={() => console.log('🗺️ Iframe loaded successfully')}
            onError={(e) => {
              console.error('🗺️ Iframe error:', e);
              console.log('🗺️ Iframe error details:', e.currentTarget);
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-green-50">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 mb-1">{address || 'Lihat lokasi toko'}</p>
                <p className="text-xs text-gray-500 mb-3">Klik untuk membuka di Google Maps</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('🗺️ Opening maps URL from fallback:', embedUrl);
                    window.open(embedUrl, '_blank');
                  }}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Buka di Google Maps
                </Button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </Card>
  );
}