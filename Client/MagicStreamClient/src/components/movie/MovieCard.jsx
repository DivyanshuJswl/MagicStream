import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getYoutubeThumbnail, getRankingBadge } from '@/utils/helpers';

export default function MovieCard({ movie }) {
  const thumbnail = movie.poster_path || getYoutubeThumbnail(movie.youtube_id);

  return (
    <Link to={`/movie/${movie.imdb_id}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.2 }}
        className="group relative rounded-xl overflow-hidden glass glass-hover cursor-pointer"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[2/3] overflow-hidden bg-dark-800">
          <img
            src={thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className="bg-primary-600 p-4 rounded-full"
              >
                <Play className="w-8 h-8 text-white fill-white" />
              </motion.div>
            </div>
          </div>

          {/* Ranking Badge */}
          {movie.ranking && (
            <div className="absolute top-3 right-3">
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getRankingBadge(
                  movie.ranking.ranking_name
                )}`}
              >
                {movie.ranking.ranking_name}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary-400 transition-colors">
            {movie.title}
          </h3>

          {/* Genres */}
          {movie.genre && movie.genre.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genre.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400"
                >
                  {genre.genre_name}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          {movie.ranking && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="text-sm font-medium">
                {(10 - movie.ranking.ranking_value).toFixed(1)}/10
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
