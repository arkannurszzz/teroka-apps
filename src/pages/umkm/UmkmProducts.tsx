import Image from 'next/image';
import { Star } from 'lucide-react';

import { Card } from '@/components/ui';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  is_available?: boolean;
}

interface UmkmProductsProps {
  umkmId: string;
  products?: Product[];
}

export default function UmkmProducts({ umkmId, products = [] }: UmkmProductsProps) {
  // Show message if no products
  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Produk Unggulan</h2>
        </div>
        <Card className="p-8 text-center">
          <p className="text-gray-500">Belum ada produk yang ditambahkan</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Produk Unggulan</h2>
        {products.length > 4 && (
          <Button variant="outline" size="sm">
            Lihat Semua
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 8).map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image */}
            <div className="relative h-48">
              <Image
                src={product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Available Badge */}
              {product.is_available !== false && (
                <div className="absolute top-2 right-2 bg-green-500/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-white">
                  Tersedia
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
              )}

              <div className="flex items-center justify-between mt-3">
                <div>
                  <div className="text-lg font-bold text-red-600">
                    Rp {product.price.toLocaleString('id-ID')}
                  </div>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700" disabled={product.is_available === false}>
                  {product.is_available === false ? 'Habis' : '+ Keranjang'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Button - only show if there are more than 8 products */}
      {products.length > 8 && (
        <div className="text-center">
          <Button variant="outline" size="lg" className="rounded-full">
            Muat Lebih Banyak Produk ({products.length - 8} lainnya)
          </Button>
        </div>
      )}
    </div>
  );
}