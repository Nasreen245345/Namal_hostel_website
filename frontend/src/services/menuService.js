// frontend/src/services/menuService.js
import api from './api';

const menuService = {
  async getWeeklyMenu() {
    const response = await api.get('/menu/weekly');
    return response.data;
  },

  async getDailyMenu(date) {
    const response = await api.get(`/menu/daily?date=${date}`);
    return response.data;
  },

  // For admin functionality
  async createMenu(menuData) {
    const response = await api.post('/menu', menuData);
    return response.data;
  },

  async updateMenu(menuId, menuData) {
    const response = await api.put(`/menu/${menuId}`, menuData);
    return response.data;
  },

  async deleteMenu(menuId) {
    const response = await api.delete(`/menu/${menuId}`);
    return response.data;
  }
};

export default menuService;