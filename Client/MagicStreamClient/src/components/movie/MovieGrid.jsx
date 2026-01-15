import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MovieGrid({ movies, loading, emptyMessage = 'No movies found' }) {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      {movies.map((movie) => (
        <motion.div key={movie.imdb_id || movie._id} variants={item}>
          <MovieCard movie={movie} />
        </motion.div>
      ))}
    </motion.div>
  );
}
