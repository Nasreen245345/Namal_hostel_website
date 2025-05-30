// This is how your frontend complaintService.js should look to work with the backend

import api from './api';
const complaintService = {
  // Create a new complaint
  createComplaint: async (complaintData) => {
    try {
      const response = await api.post('/api/complaints', complaintData);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Create complaint error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Failed to submit complaint. Please try again.'
      );
    }
  },

  // Get all user complaints with pagination and filters
  getUserComplaints: async (params = {}) => {
    try {
      const { page = 1, limit = 10, status, priority, sortBy, sortOrder } = params;
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder })
      });

      const response = await api.get(`/api/complaints?${queryParams}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Get complaints error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch complaints'
      );
    }
  },

  // Get single complaint by ID
  getComplaintById: async (id) => {
    try {
      const response = await api.get(`/complaints/${id}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Get complaint error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch complaint'
      );
    }
  },

  // Update complaint
  updateComplaint: async (id, updateData) => {
    try {
      const response = await api.put(`/api/complaints/${id}`, updateData);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Update complaint error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Failed to update complaint'
      );
    }
  },

  // Cancel complaint
  cancelComplaint: async (id) => {
    try {
      const response = await api.delete(`/api/complaints/${id}`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error('Cancel complaint error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Failed to cancel complaint'
      );
    }
  },

  // Get complaint statistics
  getComplaintStats: async () => {
    try {
      const response = await api.get('/api/complaints/stats');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Get stats error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch statistics'
      );
    }
  }
};

export default complaintService;