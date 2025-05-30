/**
 * Utility functions for formatting dates throughout the application
 */

/**
 * Formats a date object or string to display format (DD/MM/YYYY)
 * @param {Date|string} date - Date object or date string
 * @returns {string} Formatted date string
 */
export const formatDisplayDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formats a date object or string to input format (YYYY-MM-DD)
 * Used for HTML date inputs
 * @param {Date|string} date - Date object or date string
 * @returns {string} Formatted date string for HTML inputs
 */
export const formatInputDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${year}-${month}-${day}`;
};

/**
 * Formats a datetime to display with time (DD/MM/YYYY HH:MM)
 * @param {Date|string} datetime - Date object or date string
 * @param {boolean} includeSeconds - Whether to include seconds in the output
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (datetime, includeSeconds = false) => {
  if (!datetime) return '';
  
  const dateObj = typeof datetime === 'string' ? new Date(datetime) : datetime;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
  if (includeSeconds) {
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Calculates the difference between two dates in days
 * @param {Date|string} startDate - Start date object or string
 * @param {Date|string} endDate - End date object or string
 * @returns {number} Number of days between the dates
 */
export const getDaysDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Check if dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 0;
  }
  
  // Calculate difference in milliseconds
  const differenceMs = Math.abs(end - start);
  
  // Convert to days
  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
};

/**
 * Formats a date to relative time (e.g., "2 days ago", "just now")
 * @param {Date|string} date - Date object or date string
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  
  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffDay < 30) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else {
    // Fall back to formatted date for older dates
    return formatDisplayDate(dateObj);
  }
};

export default {
  formatDisplayDate,
  formatInputDate,
  formatDateTime,
  getDaysDifference,
  getRelativeTime
};