import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui/button';
// Import the global Review type from umkm.d.ts to ensure consistency
import type { Review } from '@/types/umkm';

interface UmkmReviewsProps {
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Tanggal tidak valid';

  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hari ini';
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`;
  return `${Math.floor(diffDays / 365)} tahun yang lalu`;
}

export default function UmkmReviews({
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
}: UmkmReviewsProps) {
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // index 0=1star, 4=5stars
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const displayRating =
    averageRating > 0
      ? averageRating
      : reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const displayTotal = totalReviews > 0 ? totalReviews : reviews.length;

  // Show message if no reviews
  if (reviews.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Ulasan Pelanggan</h2>
          <Button variant="outline" size="sm">
            Tulis Ulasan
          </Button>
        </div>
        <Card className="p-8 text-center">
          <p className="text-gray-500">Belum ada ulasan untuk UMKM ini</p>
          <p className="text-sm text-gray-400 mt-2">Jadilah yang pertama memberikan ulasan!</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Ulasan Pelanggan</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{displayRating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500">·</span>
            <span className="text-gray-600">{displayTotal} ulasan</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Tulis Ulasan
        </Button>
      </div>

      {/* Rating Summary */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {displayRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(displayRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">{displayTotal} ulasan</p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCounts[rating - 1] || 0;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span>{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.slice(0, 10).map((review) => (
          <Card key={review.id} className="p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Avatar with first letter of username */}
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-semibold text-lg">
                      {review.user_name?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold">{review.user_name || 'Pengguna'}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{review.rating}</span>
                    </div>
                    <span>·</span>
                    {review.created_at && <span>{formatDate(review.created_at)}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            {review.comment && <p className="text-gray-700 mb-4">{review.comment}</p>}

            {/* Review Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 h-auto px-0"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Membantu</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 h-auto px-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Balas</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Reviews - only show if there are more than 10 reviews */}
      {reviews.length > 10 && (
        <div className="text-center">
          <Button variant="outline" size="lg" className="rounded-full">
            Muat Lebih Banyak Ulasan ({reviews.length - 10} lainnya)
          </Button>
        </div>
      )}
    </div>
  );
}