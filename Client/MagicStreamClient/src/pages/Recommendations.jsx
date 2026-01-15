import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { movieService } from '@/services/movieService';
import MovieGrid from '@/components/movie/MovieGrid';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function Recommendations() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (isFetchedRef.current) return;
    isFetchedRef.current = true;

    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const data = await movieService.getRecommendedMovies();
      setMovies(data);
    } catch (error) {
      if (error.canceled) return;
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-primary-400" />
              <h1 className="text-4xl font-bold">Recommended For You</h1>
            </div>
            <p className="text-gray-400">
              Personalized picks based on your favorite genres
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={fetchRecommendations}
            className="gap-2"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* User's Favorite Genres */}
        {user?.favorite_genres && user.favorite_genres.length > 0 && (
          <div className="card">
            <p className="text-sm text-gray-400 mb-3">Your Favorite Genres:</p>
            <div className="flex flex-wrap gap-2">
              {user.favorite_genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm"
                >
                  {genre.genre_name}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Movies Grid */}
      <MovieGrid
        movies={movies}
        loading={loading}
        emptyMessage="No recommendations available yet. Try updating your favorite genres!"
      />
    </div>
  );
}
