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
    const requestKey = generateRequestKey(response.config);
    pendingRequests.delete(requestKey);
    return response;
  },
  async (error) => {
    if (error.config) {
      const requestKey = generateRequestKey(error.config);
      pendingRequests.delete(requestKey);
    }

    // Ignore canceled requests
    if (axios.isCancel(error) || error.name === 'CanceledError') {
      return Promise.reject({ canceled: true });
    }

    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest?.url?.includes(API_ENDPOINTS.LOGIN) ||
      originalRequest?.url?.includes(API_ENDPOINTS.REFRESH) ||
      originalRequest?.url?.includes(API_ENDPOINTS.REGISTER);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      if (!localStorage.getItem('user')) {
        return Promise.reject(error);
      }

      try {
        // IMPORTANT: use a bare axios instance
        await axios.post(
          `${API_URL}${API_ENDPOINTS.REFRESH}`,
          {},
          { withCredentials: true }
        );

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → hard logout
        localStorage.removeItem('user');
        window.location.replace('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
