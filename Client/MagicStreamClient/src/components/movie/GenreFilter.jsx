import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function GenreFilter({ genres, selectedGenres, onToggleGenre, onClearAll }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filter by Genre</h3>
        {selectedGenres.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.genre_name);
          return (
            <motion.button
              key={genre.genre_id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleGenre(genre.genre_name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-primary-600 text-white'
                  : 'glass glass-hover text-gray-300'
              }`}
            >
              {genre.genre_name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
