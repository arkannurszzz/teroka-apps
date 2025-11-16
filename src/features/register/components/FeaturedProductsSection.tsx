'use client';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus, Trash2, Upload } from 'lucide-react';
import type { ProductFormData, ProductFormErrors } from '../types';
import { validateProductField } from '../types';

interface FeaturedProductsSectionProps {
  products: ProductFormData[];
  errors?: ProductFormErrors[];
  onChange: (products: ProductFormData[]) => void;
  onError: (index: number, field: string, error: string) => void;
}

export function FeaturedProductsSection({
  products,
  errors = [],
  onChange,
  onError
}: FeaturedProductsSectionProps) {

  const addProduct = () => {
    const newProduct: ProductFormData = {
      name: '',
      description: '',
      price: '',
      image: ''
    };
    onChange([...products, newProduct]);
  };

  const removeProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);
    onChange(newProducts);
  };

  const updateProduct = (index: number, field: keyof ProductFormData, value: string | File | null) => {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      [field]: value
    };
    onChange(newProducts);

    // Validate field in real-time
    const error = validateProductField(field, value);
    if (error) {
      onError(index, field, error);
    } else {
      // Clear error for this field
      onError(index, field, '');
    }
  };

  const handleImageChange = (index: number, file: File | null) => {
    if (file) {
      // Validate file
      const error = validateProductField('image', file);
      if (error) {
        onError(index, 'image', error);
        toast.error(error);
        return;
      }

      updateProduct(index, 'image', file);
      toast.success('Gambar produk ditambahkan');
    } else {
      updateProduct(index, 'image', '');
    }
  };

  const formatPrice = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Convert to number and format with thousands separator
    if (digits === '') return '';
    const number = parseInt(digits);
    return number.toLocaleString('id-ID');
  };

  const handlePriceChange = (index: number, value: string) => {
    const formattedPrice = formatPrice(value);
    updateProduct(index, 'price', formattedPrice);
  };

  const getProductError = (index: number, field: string) => {
    return errors[index]?.[field as keyof ProductFormErrors];
  };

  const getImagePreview = (product: ProductFormData) => {
    if (product.image instanceof File) {
      return URL.createObjectURL(product.image);
    }
    if (typeof product.image === 'string' && product.image) {
      return product.image;
    }
    return null;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        Produk Unggulan
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Tambahkan produk unggulan dari UMKM Anda (maksimal 5 produk)
        </p>
        {products.length < 5 && (
          <Button
            type="button"
            onClick={addProduct}
            variant="outline"
            className="flex items-center gap-2 border-dashed border-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Produk
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <Card key={index} className="p-4 border">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Produk {index + 1}
              </h3>
              <Button
                type="button"
                onClick={() => removeProduct(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <Input
                  value={product.name}
                  onChange={(e) => updateProduct(index, 'name', e.target.value)}
                  placeholder="Contoh: Nasi Goreng Spesial"
                  className={`w-full ${getProductError(index, 'name') ? 'border-red-500' : ''}`}
                />
                {getProductError(index, 'name') && (
                  <p className="mt-1 text-xs text-red-500">
                    {getProductError(index, 'name')}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    Rp
                  </span>
                  <Input
                    value={product.price}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    placeholder="25.000"
                    className={`pl-12 w-full ${getProductError(index, 'price') ? 'border-red-500' : ''}`}
                  />
                </div>
                {getProductError(index, 'price') && (
                  <p className="mt-1 text-xs text-red-500">
                    {getProductError(index, 'price')}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi Produk <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) => updateProduct(index, 'description', e.target.value)}
                  placeholder="Deskripsikan produk Anda secara detail..."
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    getProductError(index, 'description') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {getProductError(index, 'description') && (
                  <p className="mt-1 text-xs text-red-500">
                    {getProductError(index, 'description')}
                  </p>
                )}
              </div>

              {/* Product Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto Produk <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  {/* Image Preview */}
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 relative">
                    {getImagePreview(product) ? (
                      <Image
                        src={getImagePreview(product)!}
                        alt={`Preview ${product.name}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex-1">
                    <input
                      id={`product-image-${index}`}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => handleImageChange(index, e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`product-image-${index}`}
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Pilih Foto
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      Format: JPG, PNG, WebP (maks. 3MB)
                    </p>
                    {getProductError(index, 'image') && (
                      <p className="mt-1 text-xs text-red-500">
                        {getProductError(index, 'image')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">
            Belum ada produk unggulan ditambahkan
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Klik &quot;Tambah Produk&quot; untuk memulai
          </p>
        </div>
      )}
    </div>
  );
}