import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '@/utils/constants';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track pending requests to prevent duplicates
const pendingRequests = new Map();

// Generate unique key for each request
const generateRequestKey = (config) => {
  const { method, url, params, data } = config;
  return `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`;
};

// Request interceptor with duplicate prevention
api.interceptors.request.use(
  (config) => {
    // Generate request key
    const requestKey = generateRequestKey(config);
    
    // Cancel previous identical request if it exists
    if (pendingRequests.has(requestKey)) {
      const controller = pendingRequests.get(requestKey);
      controller.abort();
      pendingRequests.delete(requestKey);
    }

    // Create new AbortController for this request
    const controller = new AbortController();
    config.signal = controller.signal;
    pendingRequests.set(requestKey, controller);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Remove from pending requests
    const requestKey = generateRequestKey(response.config);
    pendingRequests.delete(requestKey);
    
    return response;
  },
  async (error) => {
    // Remove from pending requests
    if (error.config) {
      const requestKey = generateRequestKey(error.config);
      pendingRequests.delete(requestKey);
    }

    // Ignore aborted requests
    if (axios.isCancel(error) || error.name === 'CanceledError') {
      return Promise.reject({ canceled: true });
    }

    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post(API_ENDPOINTS.REFRESH);
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
