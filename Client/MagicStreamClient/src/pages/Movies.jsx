import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { movieService } from '@/services/movieService';
import MovieGrid from '@/components/movie/MovieGrid';
import GenreFilter from '@/components/movie/GenreFilter';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { debounce } from '@/utils/helpers';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (isFetchedRef.current) return;
    isFetchedRef.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [moviesData, genresData] = await Promise.all([
          movieService.getAllMovies(),
          movieService.getGenres(),
        ]);
        setMovies(moviesData);
        setFilteredMovies(moviesData);
        setGenres(genresData);
      } catch (error) {
        if (error.canceled) return;
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize filterMovies with useCallback
  const filterMovies = useCallback(() => {
    let filtered = [...movies];

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genre?.some((g) => selectedGenres.includes(g.genre_name))
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  }, [movies, selectedGenres, searchQuery]);

  useEffect(() => {
    filterMovies();
  }, [filterMovies]);

  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  const toggleGenre = (genreName) => {
    setSelectedGenres((prev) =>
      prev.includes(genreName)
        ? prev.filter((g) => g !== genreName)
        : [...prev, genreName]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">All Movies</h1>
        <p className="text-gray-400">Browse our complete collection</p>
      </motion.div>

      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search movies..."
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card"
          >
            <GenreFilter
              genres={genres}
              selectedGenres={selectedGenres}
              onToggleGenre={toggleGenre}
              onClearAll={clearFilters}
            />
          </motion.div>
        )}

        {(selectedGenres.length > 0 || searchQuery) && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>
              Showing {filteredMovies.length} of {movies.length} movies
            </span>
            {(selectedGenres.length > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-primary-400 hover:text-primary-300"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      <MovieGrid
        movies={filteredMovies}
        loading={loading}
        emptyMessage="No movies match your filters"
      />
    </div>
  );
}
