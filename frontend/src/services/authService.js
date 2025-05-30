// frontend/src/services/authService.js
import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://localhost:5000/api';
const API_AUTH_URL = `${API_BASE_URL}/auth`;

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token Management
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    delete api.defaults.headers.common['x-auth-token'];
  }
};

// Initialize token on load
const token = localStorage.getItem('token');
if (token) setAuthToken(token);

class AuthService {
  // Login
  async login(email, password) {
    try {
      const response = await axios.post(`${API_AUTH_URL}/login`, { email, password });

      if (response.data.token) {
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Register
  async register(userData) {
    try {
      const response = await axios.post(`${API_AUTH_URL}/register`, userData);

      if (response.data.token) {
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user profile');
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  // Verify token
  async verifyToken() {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      setAuthToken(null);
      throw new Error(error.response?.data?.message || 'Token verification failed');
    }
  }

  // Logout
  logout() {
    setAuthToken(null);
    localStorage.removeItem('user');
  }

  // Check authentication
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Get stored user
  getUser() {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
}

// Export instances
const authService = new AuthService();
export { api };
export default authService;
