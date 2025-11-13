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
import { Star } from 'lucide-react';

interface Review {
  id?: string;
  umkm_id: string;
  user_name: string;
  rating: number;
  comment: string;
  image?: string;
}

interface ReviewFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review?: Review | null;
  umkmId: string;
  onSubmit: (data: any) => Promise<void>;
}

export function ReviewFormDialog({ open, onOpenChange, review, umkmId, onSubmit }: ReviewFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    rating: 5,
    comment: '',
    image: '',
  });

  useEffect(() => {
    if (review) {
      setFormData({
        user_name: review.user_name || '',
        rating: review.rating || 5,
        comment: review.comment || '',
        image: review.image || '',
      });
    } else {
      setFormData({
        user_name: '',
        rating: 5,
        comment: '',
        image: '',
      });
    }
  }, [review, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        umkm_id: umkmId,
        user_name: formData.user_name,
        rating: formData.rating,
        comment: formData.comment,
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
          <DialogTitle>{review ? 'Edit Review' : 'Tambah Review Baru'}</DialogTitle>
          <DialogDescription>
            {review ? 'Perbarui informasi review' : 'Isi detail review dengan lengkap'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-6 px-6">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium mb-1">
                Nama Pengguna <span className="text-red-500">*</span>
              </label>
              <Input
                id="user_name"
                name="user_name"
                required
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Ahmad Rizki"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({formData.rating} bintang)
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-1">
                Komentar
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                placeholder="Tulis komentar atau ulasan..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                URL Gambar (opsional)
              </label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/review-image.jpg"
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
              {loading ? 'Menyimpan...' : review ? 'Simpan Perubahan' : 'Tambah Review'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
