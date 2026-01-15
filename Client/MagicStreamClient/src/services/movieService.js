import api from './api';
import { API_ENDPOINTS } from '@/utils/constants';

export const movieService = {
  // Unprotected endpoints
  getAllMovies: async () => {
    const response = await api.get(API_ENDPOINTS.MOVIES);
    return response.data;
  },

  getGenres: async () => {
    const response = await api.get(API_ENDPOINTS.GENRES);
    return response.data;
  },

  // Protected endpoints
  getMovieById: async (imdbId) => {
    const response = await api.get(`${API_ENDPOINTS.MOVIE}/${imdbId}`);
    return response.data;
  },

  getRecommendedMovies: async () => {
    const response = await api.get(API_ENDPOINTS.RECOMMENDED_MOVIES);
    return response.data;
  },

  addMovie: async (movieData) => {
    const response = await api.post(API_ENDPOINTS.ADD_MOVIE, movieData);
    return response.data;
  },

  updateReview: async (imdbId, adminReview) => {
    const response = await api.patch(`${API_ENDPOINTS.UPDATE_REVIEW}/${imdbId}`, {
      admin_review: adminReview,
    });
    return response.data;
  },
};

export const authService = {
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  logout: async (userId) => {
    const response = await api.post(API_ENDPOINTS.LOGOUT, { user_id: userId });
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post(API_ENDPOINTS.REFRESH);
    return response.data;
  },
};
