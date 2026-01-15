import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Film, Edit, BarChart3, Plus } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function Dashboard() {
  const adminActions = [
    {
      title: 'Add New Movie',
      description: 'Add a new movie to the database',
      icon: Plus,
      to: '/admin/add-movie',
      color: 'from-green-500 to-green-700',
    },
    {
      title: 'Update Reviews',
      description: 'Update admin reviews and rankings',
      icon: Edit,
      to: '/movies',
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'View Analytics',
      description: 'Coming soon: View platform analytics',
      icon: BarChart3,
      to: '#',
      color: 'from-purple-500 to-purple-700',
      disabled: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700">
              <Film className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your MagicStream platform</p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {action.disabled ? (
                <div className="card opacity-50 cursor-not-allowed">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} mb-4`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
              ) : (
                <Link to={action.to}>
                  <Card hover className="h-full">
                    <div
                      className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} mb-4`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                    <p className="text-gray-400 text-sm">{action.description}</p>
                  </Card>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
