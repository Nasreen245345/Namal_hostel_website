// frontend/src/services/counselingService.js
import api from './api';

const counselingService = {
  // Get all counselors
  async getAllCounselors() {
    try {
      const response = await api.get('/api/counseling/counselors');
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching counselors:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch counselors');
    }
  },

  // Alias for backward compatibility
  async getCounselors() {
    return this.getAllCounselors();
  },

  // Get counselor details by ID
  async getCounselorDetails(counselorId) {
    try {
      const response = await api.get(`/api/counseling/counselors/${counselorId}`);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching counselor details:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch counselor details');
    }
  },

  // Book a new appointment
  async bookAppointment(appointmentData) {
    try {
      // Prepare the data to match backend expectations
      const formattedData = {
        name: appointmentData.name,
        studentId: appointmentData.studentId,
        email: appointmentData.email,
        phone: appointmentData.phone,
        counselorId: appointmentData.counselorId,
        appointmentDate: appointmentData.date,
        timeSlot: appointmentData.timeSlot,
        reasonForVisit: appointmentData.reasonForVisit,
        preferredMode: appointmentData.preferredMode || 'in-person',
        urgency: appointmentData.urgency || 'normal',
        isFirstVisit: appointmentData.previousVisit === 'no', // Convert to boolean
      };

      console.log('Sending appointment data to backend:', formattedData);

      const response = await api.post('/api/counseling/appointments', formattedData);
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Appointment booked successfully'
      };
    } catch (error) {
      console.error('Error booking appointment:', error);
      
      // Enhanced error handling
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please check your connection and try again');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error - please try again later');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication required - please log in again');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      
      throw new Error('Failed to book appointment. Please try again.');
    }
  },

  // Get user's appointments
  async getUserAppointments() {
    try {
      const response = await api.get('/api/counseling/appointments/user');
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching user appointments:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch appointments');
    }
  },

  // Cancel an appointment
  async cancelAppointment(appointmentId) {
    try {
      const response = await api.delete(`/api/counseling/appointments/${appointmentId}`);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Appointment cancelled successfully'
      };
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw new Error(error.response?.data?.message || 'Failed to cancel appointment');
    }
  },

  // Update appointment status (for counselors/admins)
  async updateAppointmentStatus(appointmentId, status, notes = '') {
    try {
      const response = await api.patch(`/api/counseling/appointments/${appointmentId}/status`, { 
        status, 
        notes 
      });
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Appointment status updated successfully'
      };
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw new Error(error.response?.data?.message || 'Failed to update appointment status');
    }
  },

  // Get available time slots for a counselor on a specific date
  async getAvailableTimeSlots(counselorId, date) {
    try {
      const response = await api.get(`/api/counseling/counselors/${counselorId}/timeslots`, {
        params: { date }
      });
      
      return {
        success: true,
        data: response.data.data || response.data.availableSlots || [
          '9:00 AM - 10:00 AM',
          '10:00 AM - 11:00 AM',
          '11:00 AM - 12:00 PM',
          '1:00 PM - 2:00 PM',
          '2:00 PM - 3:00 PM',
          '3:00 PM - 4:00 PM',
          '4:00 PM - 5:00 PM'
        ]
      };
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      
      // Return default slots on error instead of throwing
      return {
        success: false,
        data: [
          '9:00 AM - 10:00 AM',
          '10:00 AM - 11:00 AM',
          '11:00 AM - 12:00 PM',
          '1:00 PM - 2:00 PM',
          '2:00 PM - 3:00 PM',
          '3:00 PM - 4:00 PM',
          '4:00 PM - 5:00 PM'
        ],
        message: 'Using default time slots'
      };
    }
  },

  // Get counselor's appointments (for counselor dashboard)
  async getCounselorAppointments(counselorId, filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const url = `/api/counseling/appointments/counselor/${counselorId}${params ? `?${params}` : ''}`;
      const response = await api.get(url);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching counselor appointments:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch counselor appointments');
    }
  },

  // Get appointment statistics (for dashboard)
  async getAppointmentStats() {
    try {
      const response = await api.get('/api/counseling/appointments/stats');
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching appointment stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch appointment statistics');
    }
  }
};

export default counselingService;