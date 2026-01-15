export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'MagicStream';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MOVIES: '/movies',
  MOVIE_DETAIL: '/movie/:imdb_id',
  RECOMMENDATIONS: '/recommendations',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_ADD_MOVIE: '/admin/add-movie',
  ADMIN_UPDATE_REVIEW: '/admin/update-review/:imdb_id',
};

export const API_ENDPOINTS = {
  // Unprotected
  MOVIES: '/movies',
  GENRES: '/genres',
  REGISTER: '/register',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REFRESH: '/refresh',
  
  // Protected
  MOVIE: '/movie',
  ADD_MOVIE: '/addmovie',
  RECOMMENDED_MOVIES: '/recommendedmovies',
  UPDATE_REVIEW: '/updatereview',
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const RANKING_NAMES = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  AVERAGE: 'average',
  POOR: 'poor',
  TERRIBLE: 'terrible',
};
