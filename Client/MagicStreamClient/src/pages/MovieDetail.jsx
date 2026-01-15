import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Film } from 'lucide-react';
import { movieService } from '@/services/movieService';
import VideoPlayer from '@/components/movie/VideoPlayer';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getYoutubeThumbnail, getRankingBadge } from '@/utils/helpers';

export default function MovieDetail() {
  const { imdb_id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    // Reset on imdb_id change
    isFetchedRef.current = false;
    
    if (isFetchedRef.current) return;
    isFetchedRef.current = true;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieById(imdb_id);
        setMovie(data);
      } catch (error) {
        if (error.canceled) return;
        console.error('Error fetching movie:', error);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdb_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">{error || 'Movie not found'}</p>
          <Button onClick={() => navigate('/movies')}>Back to Movies</Button>
        </div>
      </div>
    );
  }

  const thumbnail = movie.poster_path || getYoutubeThumbnail(movie.youtube_id);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] -mt-16 pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/90 to-dark-950/60" />
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 relative z-10 pt-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card overflow-hidden">
              <img
                src={thumbnail}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title & Rating */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {movie.ranking && (
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-md ${getRankingBadge(
                      movie.ranking.ranking_name
                    )}`}
                  >
                    {movie.ranking.ranking_name}
                  </div>
                )}

                {movie.ranking && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <span className="font-semibold">
                      {(10 - movie.ranking.ranking_value).toFixed(1)}/10
                    </span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genre && movie.genre.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full glass text-sm font-medium"
                    >
                      {genre.genre_name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Review */}
            {movie.admin_review && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-3">Review</h2>
                <p className="text-gray-300 leading-relaxed">{movie.admin_review}</p>
              </div>
            )}

            {/* Movie Info */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Movie Information</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Film className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">IMDB ID</p>
                    <p className="font-medium">{movie.imdb_id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {movie.youtube_id && (
                <VideoPlayer youtubeId={movie.youtube_id} title={movie.title} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
