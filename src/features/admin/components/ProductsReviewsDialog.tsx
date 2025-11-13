'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProductFormDialog } from './ProductFormDialog';
import { ReviewFormDialog } from './ReviewFormDialog';
import { toast } from 'sonner';

interface Product {
  id: string;
  umkm_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available: boolean;
}

interface Review {
  id: string;
  umkm_id: string;
  user_name: string;
  rating: number;
  comment: string;
  image?: string;
}

interface ProductsReviewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  umkmId: string;
  umkmName: string;
}

export function ProductsReviewsDialog({ open, onOpenChange, umkmId, umkmName }: ProductsReviewsDialogProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'reviews'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const [productFormOpen, setProductFormOpen] = useState(false);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    if (open) {
      fetchProducts();
      fetchReviews();
    }
  }, [open, umkmId]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products?umkm_id=${umkmId}`);
      const result = await response.json();
      if (result.success) {
        setProducts(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reviews?umkm_id=${umkmId}`);
      const result = await response.json();
      if (result.success) {
        setReviews(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Gagal memuat review');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (data: any) => {
    try {
      const isEdit = !!selectedProduct;
      const url = isEdit ? `/api/products?id=${selectedProduct.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(isEdit ? 'Produk berhasil diperbarui' : 'Produk berhasil ditambahkan');
        fetchProducts();
      } else {
        toast.error(result.message || 'Gagal menyimpan produk');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error('Terjadi kesalahan saat menyimpan produk');
    }
  };

  const handleReviewSubmit = async (data: any) => {
    try {
      const isEdit = !!selectedReview;
      const url = isEdit ? `/api/reviews?id=${selectedReview.id}` : '/api/reviews';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(isEdit ? 'Review berhasil diperbarui' : 'Review berhasil ditambahkan');
        fetchReviews();
      } else {
        toast.error(result.message || 'Gagal menyimpan review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Terjadi kesalahan saat menyimpan review');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        toast.success('Produk berhasil dihapus');
        fetchProducts();
      } else {
        toast.error(result.message || 'Gagal menghapus produk');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Terjadi kesalahan saat menghapus produk');
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus review ini?')) return;

    try {
      const response = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        toast.success('Review berhasil dihapus');
        fetchReviews();
      } else {
        toast.error(result.message || 'Gagal menghapus review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Terjadi kesalahan saat menghapus review');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent maxWidth="4xl">
          <DialogHeader>
            <DialogTitle>Kelola Produk & Review - {umkmName}</DialogTitle>
          </DialogHeader>

          <div className="py-6 px-6">
            {/* Tabs */}
            <div className="flex border-b mb-6 -mx-6 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Produk ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Review ({reviews.length})
              </button>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Kelola produk yang ditawarkan oleh UMKM ini
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedProduct(null);
                      setProductFormOpen(true);
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Produk
                  </Button>
                </div>

                <div className="max-h-[400px] overflow-y-auto space-y-3">
                  {loading ? (
                    <div className="text-center py-8 text-gray-500">Memuat produk...</div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Belum ada produk. Klik "Tambah Produk" untuk menambah.
                    </div>
                  ) : (
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm font-medium text-red-600">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">{product.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setProductFormOpen(true);
                            }}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-green-50 hover:bg-green-100 text-green-600"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Kelola review dan rating dari pelanggan
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedReview(null);
                      setReviewFormOpen(true);
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Review
                  </Button>
                </div>

                <div className="max-h-[400px] overflow-y-auto space-y-3">
                  {loading ? (
                    <div className="text-center py-8 text-gray-500">Memuat review...</div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Belum ada review. Klik "Tambah Review" untuk menambah.
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{review.user_name}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedReview(review);
                              setReviewFormOpen(true);
                            }}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-green-50 hover:bg-green-100 text-green-600"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Form Dialog */}
      <ProductFormDialog
        open={productFormOpen}
        onOpenChange={setProductFormOpen}
        product={selectedProduct}
        umkmId={umkmId}
        onSubmit={handleProductSubmit}
      />

      {/* Review Form Dialog */}
      <ReviewFormDialog
        open={reviewFormOpen}
        onOpenChange={setReviewFormOpen}
        review={selectedReview}
        umkmId={umkmId}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
}
