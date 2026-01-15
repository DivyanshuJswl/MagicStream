import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/ui/Toast';
import { movieService } from '@/services/movieService';

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'USER',
    favorite_genres: [],
  });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleGenre = (genre) => {
    const isSelected = formData.favorite_genres.some(g => g.genre_id === genre.genre_id);
    if (isSelected) {
      setFormData({
        ...formData,
        favorite_genres: formData.favorite_genres.filter(g => g.genre_id !== genre.genre_id),
      });
    } else {
      setFormData({
        ...formData,
        favorite_genres: [...formData.favorite_genres, genre],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.favorite_genres.length === 0) {
      addToast('Please select at least one favorite genre', 'error');
      return;
    }

    setLoading(true);

    const result = await register(formData);

    if (result.success) {
      addToast('Registration successful! Please login.', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      addToast(result.error || 'Registration failed', 'error');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <Toast toasts={toasts} onRemove={removeToast} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-3 rounded-xl">
              <Film className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">MagicStream</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Join us and start streaming</p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
                required
              />

              <Input
                label="Last Name"
                type="text"
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Favorite Genres */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Select Your Favorite Genres *
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => {
                  const isSelected = formData.favorite_genres.some(g => g.genre_id === genre.genre_id);
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
              <p className="mt-2 text-xs text-gray-400">
                Selected: {formData.favorite_genres.length} genre(s)
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full gap-2"
              loading={loading}
              disabled={loading}
            >
              {!loading && <UserPlus className="w-5 h-5" />}
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
