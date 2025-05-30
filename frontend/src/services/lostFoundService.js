// frontend/src/services/lostFoundService.js 
import api from './api';
const getAuthHeaders = () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      console.warn('No valid token found for auth headers');
      return {};
    }
    
    // Basic JWT validation
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error('Invalid token format in getAuthHeaders');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {};
    }
    
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return {};
  }
};

const lostFoundService = {
  async getAllItems(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query parameters
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.search) queryParams.append('search', filters.search);
      
      const response = await api.get(`/api/lostfound?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting all items:', error);
      throw error;
    }
  },

  async createItem(itemData) {
    try {
      // Validate that user is authenticated before making request
      const token = localStorage.getItem('token');
      if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
        throw new Error('You must be logged in to create an item. Please log in and try again.');
      }
      
      // Check if we should use FormData (for file uploads) or JSON
      const hasFile = itemData.itemImage && itemData.itemImage instanceof File;
      
      if (hasFile) {
        // Use FormData for file uploads
        const formData = new FormData();
        
        // Map frontend form fields to match backend expectations
        formData.append('type', itemData.itemType); // 'lost' or 'found'
        formData.append('title', itemData.itemName);
        formData.append('description', itemData.description);
        formData.append('category', itemData.category);
        formData.append('date', itemData.date);
        formData.append('location', itemData.location);
        
        // Add optional color field
        if (itemData.itemColor) {
          formData.append('color', itemData.itemColor);
        }
        
        // Contact information as nested object structure
        formData.append('contact[name]', itemData.contactName);
        formData.append('contact[email]', itemData.contactEmail);
        if (itemData.contactPhone) {
          formData.append('contact[phone]', itemData.contactPhone);
        }
        
        // Add image file
        formData.append('image', itemData.itemImage);
        
        // Debug: Log form data (excluding file)
        console.log('Creating item with FormData:');
        for (let [key, value] of formData.entries()) {
          if (key !== 'image') {
            console.log(`${key}: ${value}`);
          }
        }
        
        const response = await api.post('/api/lostfound', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders()
          }
        });
        
        return response.data;
      } else {
        // Use JSON for non-file uploads
        const requestData = {
          type: itemData.itemType,
          title: itemData.itemName,
          description: itemData.description,
          category: itemData.category,
          date: itemData.date,
          location: itemData.location,
          contact: {
            name: itemData.contactName,
            email: itemData.contactEmail,
            ...(itemData.contactPhone && { phone: itemData.contactPhone })
          },
          ...(itemData.itemColor && { color: itemData.itemColor })
        };
        
        console.log('Creating item with JSON data:', requestData);
        
        const response = await api.post('/api/lostfound', requestData, {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          }
        });
        
        return response.data;
      }
      
    } catch (error) {
      console.error('Error creating item:', error);
      
      // Provide more specific error messages
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (error.response?.status === 403) {
        throw new Error('You do not have permission to perform this action.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message.includes('logged in')) {
        throw error; // Re-throw our custom auth error
      } else {
        throw new Error('Failed to create item. Please try again.');
      }
    }
  },

  async getUserItems() {
    try {
      const response = await api.get('/api/lostfound/user/my', {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error getting user items:', error);
      throw error;
    }
  },

  async getItemDetails(itemId) {
    try {
      const response = await api.get(`/api/lostfound/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting item details:', error);
      throw error;
    }
  },

  async getItemsByCategory(category) {
    try {
      const response = await api.get(`/api/lostfound/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error getting items by category:', error);
      throw error;
    }
  },

  async updateItem(itemId, updateData) {
    try {
      // Handle file upload in updates
      if (updateData.itemImage) {
        const formData = new FormData();
        
        // Add all update fields
        Object.keys(updateData).forEach(key => {
          if (key === 'itemImage') {
            formData.append('image', updateData[key]);
          } else if (key === 'itemName') {
            formData.append('title', updateData[key]);
          } else if (key === 'itemType') {
            formData.append('type', updateData[key]);
          } else if (key.startsWith('contact')) {
            // Handle contact fields
            const contactField = key.replace('contact', '').toLowerCase();
            formData.append(`contact[${contactField}]`, updateData[key]);
          } else {
            formData.append(key, updateData[key]);
          }
        });
        
        const response = await api.put(`/api/lostfound/${itemId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders()
          }
        });
        
        return response.data;
      } else {
        // Map field names for JSON updates
        const backendData = { ...updateData };
        if (backendData.itemName) {
          backendData.title = backendData.itemName;
          delete backendData.itemName;
        }
        if (backendData.itemType) {
          backendData.type = backendData.itemType;
          delete backendData.itemType;
        }
        
        const response = await api.put(`/api/lostfound/${itemId}`, backendData, {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  async updateItemStatus(itemId, status) {
    try {
      const response = await api.put(`/api/lostfound/${itemId}/status`, { status }, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating item status:', error);
      throw error;
    }
  },

  async deleteItem(itemId) {
    try {
      const response = await api.delete(`/api/lostfound/${itemId}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },

  async getStats() {
    try {
      const response = await api.get('/api/lostfound/stats');
      return response.data;
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }
};

export default lostFoundService;