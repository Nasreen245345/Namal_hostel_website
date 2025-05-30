// frontend/src/services/galleryService.js
import api from './api';

const galleryService = {
  async getAllImages(category = null) {
    const url = category ? `/gallery?category=${category}` : '/gallery';
    const response = await api.get(url);
    return response.data;
  },

  async uploadImage(imageData) {
    const formData = new FormData();
    
    // Add category and description
    formData.append('category', imageData.category);
    formData.append('description', imageData.description);
    
    // Add image file
    formData.append('image', imageData.image);
    
    const response = await api.post('/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },

  // For admin functionality
  async deleteImage(imageId) {
    const response = await api.delete(`/gallery/${imageId}`);
    return response.data;
  },

  async updateImageDetails(imageId, details) {
    const response = await api.put(`/gallery/${imageId}`, details);
    return response.data;
  }
};

export default galleryService;