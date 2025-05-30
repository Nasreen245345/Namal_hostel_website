// backend/utils/helpers.js
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

/**
 * Generate a unique filename for uploads
 * @param {string} originalname - Original file name
 * @returns {string} - Unique filename
 */
const generateUniqueFilename = (originalname) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const extension = path.extname(originalname);
  return `${timestamp}-${randomString}${extension}`;
};

/**
 * Remove a file from the file system
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} - True if deletion was successful
 */
const removeFile = async (filePath) => {
  try {
    const fullPath = path.join(__dirname, '../', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error removing file: ${error.message}`);
    return false;
  }
};

/**
 * Format error response
 * @param {Error} error - Error object
 * @param {string} message - Optional custom message
 * @returns {Object} - Formatted error response
 */
const formatError = (error, message = null) => {
  return {
    success: false,
    message: message || error.message,
    error: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  };
};

/**
 * Format success response
 * @param {string} message - Success message
 * @param {Object} data - Response data
 * @returns {Object} - Formatted success response
 */
const formatSuccess = (message, data = null) => {
  const response = {
    success: true,
    message,
  };

  if (data) {
    response.data = data;
  }

  return response;
};

/**
 * Generate pagination data
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} - Pagination data
 */
const getPaginationData = (page, limit, total) => {
  const currentPage = parseInt(page, 10) || 1;
  const itemsPerPage = parseInt(limit, 10) || 10;
  const totalItems = total;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};

/**
 * Get start and end date for a week
 * @param {Date} date - Base date
 * @returns {Object} - Start and end dates
 */
const getWeekRange = (date) => {
  const givenDate = new Date(date);
  const day = givenDate.getDay(); // 0 is Sunday
  
  // Calculate the start date (Sunday) by subtracting the day
  const startDate = new Date(givenDate);
  startDate.setDate(givenDate.getDate() - day);
  startDate.setHours(0, 0, 0, 0);
  
  // Calculate the end date (Saturday) by adding the remaining days of the week
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);
  
  return { startDate, endDate };
};

/**
 * Parse and validate a date string
 * @param {string} dateString - Date string to parse
 * @returns {Date|null} - Parsed date or null if invalid
 */
const parseDate = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Check if a user has the required role
 * @param {Object} user - User object
 * @param {string|Array} role - Required role or roles
 * @returns {boolean} - True if user has the required role
 */
const hasRole = (user, role) => {
  if (!user || !user.role) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};

module.exports = {
  generateUniqueFilename,
  removeFile,
  formatError,
  formatSuccess,
  getPaginationData,
  getWeekRange,
  parseDate,
  hasRole
};