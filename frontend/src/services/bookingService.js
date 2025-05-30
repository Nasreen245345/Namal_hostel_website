// services/bookingService.js
import api from './api.js';

const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/api/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create booking' };
    }
  },

  // Get all bookings for a user
  getUserBookings: async () => {
    try {
      const response = await api.get('/api/bookings/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch bookings' };
    }
  },

  // Get a specific booking by ID
  getBookingById: async (bookingId) => {
    try {
      const response = await api.get(`/api/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch booking' };
    }
  },

  // Update booking status (for admin)
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await api.put(`/api/bookings/${bookingId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update booking status' };
    }
  },

  // Cancel a booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await api.delete(`/api/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel booking' };
    }
  },

  // Get all bookings (for admin)
  getAllBookings: async () => {
    try {
      const response = await api.get('/api/bookings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch all bookings' };
    }
  }
};

export default bookingService;