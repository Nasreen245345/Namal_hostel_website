// frontend/src/services/feeService.js
import api from './api';

const feeService = {
  async getAllFeeStructures() {
    const response = await api.get('/fees');
    return response.data;
  },

  async getFeeDetails(feeId) {
    const response = await api.get(`/fees/${feeId}`);
    return response.data;
  },

  // For admin functionality
  async createFee(feeData) {
    const response = await api.post('/fees', feeData);
    return response.data;
  },

  async updateFee(feeId, feeData) {
    const response = await api.put(`/fees/${feeId}`, feeData);
    return response.data;
  },

  async deleteFee(feeId) {
    const response = await api.delete(`/fees/${feeId}`);
    return response.data;
  }
};

export default feeService;