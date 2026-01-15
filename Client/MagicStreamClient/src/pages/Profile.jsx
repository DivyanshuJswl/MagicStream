import { motion } from 'framer-motion';
import { User, Mail, Award, Film } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Account Info */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary-500/20">
                <Mail className="w-5 h-5 text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold">Account Info</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="font-medium">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">User ID</p>
                <p className="font-medium text-xs">{user.user_id}</p>
              </div>
            </div>
          </Card>

          {/* Role */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary-500/20">
                <Award className="w-5 h-5 text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold">Role</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Account Type</p>
                <div className="mt-2">
                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Favorite Genres */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary-500/20">
              <Film className="w-5 h-5 text-primary-400" />
            </div>
            <h2 className="text-xl font-semibold">Favorite Genres</h2>
          </div>
          {user.favorite_genres && user.favorite_genres.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.favorite_genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full glass text-sm font-medium"
                >
                  {genre.genre_name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No favorite genres selected</p>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
