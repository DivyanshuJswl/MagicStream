import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthProvider'; // Changed import
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Movies from '@/pages/Movies';
import MovieDetail from '@/pages/MovieDetail';
import Recommendations from '@/pages/Recommendations';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/admin/Dashboard';
import AddMovie from '@/pages/admin/AddMovie';
import UpdateReview from '@/pages/admin/UpdateReview';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:imdb_id" element={<MovieDetail />} />

              {/* Protected User Routes */}
              <Route
                path="/recommendations"
                element={
                  <ProtectedRoute>
                    <Recommendations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Admin Only Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-movie"
                element={
                  <ProtectedRoute adminOnly>
                    <AddMovie />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/update-review/:imdb_id"
                element={
                  <ProtectedRoute adminOnly>
                    <UpdateReview />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
