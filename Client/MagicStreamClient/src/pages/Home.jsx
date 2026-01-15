import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { movieService } from '@/services/movieService';
import { useAuth } from '@/hooks/useAuth';
import MovieGrid from '@/components/movie/MovieGrid';
import Button from '@/components/ui/Button';
import { getYoutubeThumbnail } from '@/utils/helpers';

export default function Home() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isFetchedRef = useRef(false); // Prevent multiple fetches

  useEffect(() => {
    // Prevent multiple calls
    if (isFetchedRef.current) return;
    isFetchedRef.current = true;

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const movies = await movieService.getAllMovies();
        if (movies.length > 0) {
          setFeaturedMovie(movies[0]);
          setTrendingMovies(movies.slice(1, 9));
        }
      } catch (error) {
        if (error.canceled) return; // Ignore cancelled requests
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, []); // Empty dependency array - run once

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredMovie && (
        <section className="relative h-[80vh] -mt-16 pt-16">
          <div className="absolute inset-0">
            <img
              src={featuredMovie.poster_path || getYoutubeThumbnail(featuredMovie.youtube_id)}
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/40" />
          </div>

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass backdrop-blur-md border border-primary-500/30"
              >
                <TrendingUp className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-primary-400">Featured Today</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                {featuredMovie.title}
              </h1>

              {featuredMovie.admin_review && (
                <p className="text-lg text-gray-300 line-clamp-3">
                  {featuredMovie.admin_review}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                <Link to={`/movie/${featuredMovie.imdb_id}`}>
                  <Button variant="primary" size="lg" className="gap-2">
                    <Play className="w-5 h-5 fill-white" />
                    Watch Now
                  </Button>
                </Link>
                <Link to="/movies">
                  <Button variant="secondary" size="lg">
                    Browse All Movies
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-400">Popular movies this week</p>
          </div>
          <Link to="/movies">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <MovieGrid movies={trendingMovies} loading={loading} />
      </section>

      {user && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-900/20" />
            <div className="absolute inset-0 glass backdrop-blur-xl" />

            <div className="relative z-10 space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <Sparkles className="w-16 h-16 text-primary-400" />
              </motion.div>

              <h2 className="text-4xl font-bold">Discover Your Perfect Match</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Get AI-powered movie recommendations tailored just for you based on your favorite genres
              </p>

              <Link to="/recommendations">
                <Button variant="primary" size="lg" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Get Recommendations
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
