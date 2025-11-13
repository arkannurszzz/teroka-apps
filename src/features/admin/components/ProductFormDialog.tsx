'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Product {
  id?: string;
  umkm_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available?: boolean;
}

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  umkmId: string;
  onSubmit: (data: any) => Promise<void>;
}

export function ProductFormDialog({ open, onOpenChange, product, umkmId, onSubmit }: ProductFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'makanan',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || 'makanan',
        image: product.image || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'makanan',
        image: '',
      });
    }
  }, [product, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        umkm_id: umkmId,
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        category: formData.category,
        image: formData.image || null,
      };

      await onSubmit(submitData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="lg">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
          <DialogDescription>
            {product ? 'Perbarui informasi produk' : 'Isi detail produk dengan lengkap'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-6 px-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nasi Goreng Spesial"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Kategori
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="jasa">Jasa</option>
                <option value="fashion">Fashion</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Deskripsi produk..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                URL Gambar
              </label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Menyimpan...' : product ? 'Simpan Perubahan' : 'Tambah Produk'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
