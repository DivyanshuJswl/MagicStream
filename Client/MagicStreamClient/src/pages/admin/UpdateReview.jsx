import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import { movieService } from '@/services/movieService';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/ui/Toast';
import { getYoutubeThumbnail } from '@/utils/helpers';

export default function UpdateReview() {
  const { imdb_id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [adminReview, setAdminReview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  // Use useCallback to memoize fetchMovie
  const fetchMovie = useCallback(async () => {
    try {
      const data = await movieService.getMovieById(imdb_id);
      setMovie(data);
      setAdminReview(data.admin_review || '');
    } catch (error) {
      if (error.canceled) return;
      console.error('Error fetching movie:', error);
      addToast('Failed to load movie', 'error');
    } finally {
      setLoading(false);
    }
  }, [imdb_id, addToast]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await movieService.updateReview(imdb_id, adminReview);
      addToast('Review updated successfully!', 'success');
      setTimeout(() => navigate(`/movie/${imdb_id}`), 2000);
    } catch (error) {
      addToast(error.response?.data?.error || 'Failed to update review', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Movie not found</p>
      </div>
    );
  }

  const thumbnail = movie.poster_path || getYoutubeThumbnail(movie.youtube_id);

  return (
    <div className="container mx-auto px-4 py-24">
      <Toast toasts={toasts} onRemove={removeToast} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Update Review</h1>
          <p className="text-gray-400">Update admin review and AI ranking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card">
              <img
                src={thumbnail}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
              {movie.ranking && (
                <p className="text-sm text-gray-400">
                  Current Ranking: <span className="text-white">{movie.ranking.ranking_name}</span>
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Admin Review
                  </label>
                  <textarea
                    rows="10"
                    placeholder="Write your review here... AI will automatically analyze sentiment and update ranking."
                    value={adminReview}
                    onChange={(e) => setAdminReview(e.target.value)}
                    className="input resize-none"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    💡 Tip: The AI will analyze your review and automatically assign a ranking
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full gap-2"
                  loading={saving}
                  disabled={saving}
                >
                  {!saving && <Save className="w-5 h-5" />}
                  Update Review
                </Button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
