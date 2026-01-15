import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft } from 'lucide-react';
import { movieService } from '@/services/movieService';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/ui/Toast';

export default function AddMovie() {
  const [formData, setFormData] = useState({
    imdb_id: '',
    title: '',
    poster_path: '',
    youtube_id: '',
    genre: [],
    admin_review: '',
    ranking: {
      ranking_value: 5,
      ranking_name: 'average',
    },
  });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const navigate = useNavigate();

  // Move fetch logic directly into useEffect
  useEffect(() => {
    let isMounted = true;

    const fetchGenres = async () => {
      try {
        const data = await movieService.getGenres();
        if (isMounted) {
          setGenres(data);
        }
      } catch (error) {
        if (error.canceled) return;
        if (isMounted) {
          console.error('Error fetching genres:', error);
        }
      }
    };

    fetchGenres();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ranking_value' || name === 'ranking_name') {
      setFormData({
        ...formData,
        ranking: { ...formData.ranking, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleGenre = (genre) => {
    const isSelected = formData.genre.some((g) => g.genre_id === genre.genre_id);
    if (isSelected) {
      setFormData({
        ...formData,
        genre: formData.genre.filter((g) => g.genre_id !== genre.genre_id),
      });
    } else {
      setFormData({
        ...formData,
        genre: [...formData.genre, genre],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.genre.length === 0) {
      addToast('Please select at least one genre', 'error');
      return;
    }

    setLoading(true);

    try {
      await movieService.addMovie({
        ...formData,
        ranking: {
          ranking_value: parseInt(formData.ranking.ranking_value),
          ranking_name: formData.ranking.ranking_name,
        },
      });
      addToast('Movie added successfully!', 'success');
      setTimeout(() => navigate('/admin'), 2000);
    } catch (error) {
      addToast(error.response?.data?.error || 'Failed to add movie', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <Toast toasts={toasts} onRemove={removeToast} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Add New Movie</h1>
          <p className="text-gray-400">Add a new movie to the database</p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="IMDB ID"
              type="text"
              name="imdb_id"
              placeholder="tt1234567"
              value={formData.imdb_id}
              onChange={handleChange}
              required
            />

            <Input
              label="Movie Title"
              type="text"
              name="title"
              placeholder="Enter movie title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              label="Poster URL"
              type="url"
              name="poster_path"
              placeholder="https://example.com/poster.jpg"
              value={formData.poster_path}
              onChange={handleChange}
              required
            />

            <Input
              label="YouTube ID"
              type="text"
              name="youtube_id"
              placeholder="dQw4w9WgXcQ"
              value={formData.youtube_id}
              onChange={handleChange}
              required
            />

            {/* Genres */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Select Genres *
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => {
                  const isSelected = formData.genre.some((g) => g.genre_id === genre.genre_id);
                  return (
                    <motion.button
                      key={genre.genre_id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleGenre(genre)}
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

            {/* Admin Review */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Admin Review (Optional)
              </label>
              <textarea
                name="admin_review"
                rows="4"
                placeholder="Write your review here..."
                value={formData.admin_review}
                onChange={handleChange}
                className="input resize-none"
              />
            </div>

            {/* Ranking */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Ranking Value (1-10)"
                type="number"
                name="ranking_value"
                min="1"
                max="10"
                value={formData.ranking.ranking_value}
                onChange={handleChange}
                required
              />

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Ranking Name
                </label>
                <select
                  name="ranking_name"
                  value={formData.ranking.ranking_name}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                  <option value="terrible">Terrible</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full gap-2"
              loading={loading}
              disabled={loading}
            >
              {!loading && <Plus className="w-5 h-5" />}
              Add Movie
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
