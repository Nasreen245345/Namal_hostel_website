// services/api.js - FIXED VERSION
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to safely get token
const getValidToken = () => {
  try {
    const token = localStorage.getItem('token');
    
    // Check if token exists and is not empty
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      console.warn('No valid token found in localStorage');
      return null;
    }
    
    // Basic JWT format validation (should have 3 parts separated by dots)
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error('Token format is invalid - JWT should have 3 parts');
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
    
    // Check if token is expired (basic check)
    try {
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (payload.exp && payload.exp < currentTime) {
        console.warn('Token has expired');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
      }
    } catch (e) {
      console.error('Error parsing token payload:', e);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('Error getting token from localStorage:', error);
    return null;
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getValidToken();
    
    if (token) {
      // Ensure we're setting the Authorization header correctly
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added Authorization header to request'); // Debug log
    } else {
      console.warn('No valid token available for request');
      // Remove Authorization header if no valid token
      delete config.headers.Authorization;
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Handle common errors
    if (error.response?.status === 401) {
      console.warn('Authentication failed - clearing stored auth data');
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if we're not already on the login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;