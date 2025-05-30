/**
 * Utility functions for form validation throughout the application
 */

// Email validation using regex
export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Student ID validation (Namal University specific format)
export const isStudentIdValid = (studentId) => {
  // Assuming Namal student IDs follow a specific format
  // Example format: BCS-F20-123 or EE-S21-045
  const studentIdRegex = /^[A-Z]{2,4}-[FS]\d{2}-\d{3}$/;
  return studentIdRegex.test(studentId);
};

// Password validation (minimum requirements)
export const isPasswordStrong = (password) => {
  // Check if password meets minimum requirements:
  // - At least 8 characters
  // - Contains at least one uppercase letter
  // - Contains at least one lowercase letter
  // - Contains at least one number
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  // Return object with validation results
  return {
    isValid: minLength && hasUppercase && hasLowercase && hasNumber,
    minLength,
    hasUppercase,
    hasLowercase,
    hasNumber
  };
};

// Phone number validation (Pakistan format)
export const isPhoneValid = (phone) => {
  // Pakistan phone format: +923xxxxxxxxx or 03xxxxxxxxx
  const phoneRegex = /^(\+92|0)[3][0-9]{9}$/;
  return phoneRegex.test(phone);
};

// Name validation (alphabetic characters, spaces, and hyphens only)
export const isNameValid = (name) => {
  const nameRegex = /^[A-Za-z\s\-]+$/;
  return nameRegex.test(name);
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim() !== '';
  }
  return value !== null && value !== undefined;
};

// Date validation (check if date is in the future)
export const isFutureDate = (dateStr) => {
  const inputDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of today
  
  return inputDate >= today;
};

// Date validation (check if date is in the past)
export const isPastDate = (dateStr) => {
  const inputDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of today
  
  return inputDate < today;
};

// Age validation (check if user is at least 18 years old)
export const isAdult = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rules = validationRules[field];
    
    // Required field validation
    if (rules.required && !isRequired(value)) {
      errors[field] = rules.requiredMessage || 'This field is required';
      return; // Skip other validations if field is empty and required
    }
    
    // Skip other validations if value is empty and not required
    if (!isRequired(value) && !rules.required) {
      return;
    }
    
    // Email validation
    if (rules.email && !isEmailValid(value)) {
      errors[field] = rules.emailMessage || 'Please enter a valid email address';
    }
    
    // Student ID validation
    if (rules.studentId && !isStudentIdValid(value)) {
      errors[field] = rules.studentIdMessage || 'Invalid student ID format';
    }
    
    // Password validation
    if (rules.password) {
      const passwordCheck = isPasswordStrong(value);
      if (!passwordCheck.isValid) {
        errors[field] = rules.passwordMessage || 
          'Password must be at least 8 characters and include uppercase, lowercase, and numbers';
      }
    }
    
    // Phone validation
    if (rules.phone && !isPhoneValid(value)) {
      errors[field] = rules.phoneMessage || 'Please enter a valid phone number';
    }
    
    // Name validation
    if (rules.name && !isNameValid(value)) {
      errors[field] = rules.nameMessage || 'Name can only contain letters, spaces, and hyphens';
    }
    
    // Future date validation
    if (rules.futureDate && !isFutureDate(value)) {
      errors[field] = rules.futureDateMessage || 'Date must be in the future';
    }
    
    // Past date validation
    if (rules.pastDate && !isPastDate(value)) {
      errors[field] = rules.pastDateMessage || 'Date must be in the past';
    }
    
    // Adult age validation
    if (rules.adult && !isAdult(value)) {
      errors[field] = rules.adultMessage || 'You must be at least 18 years old';
    }
    
    // Minimum length validation
    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = rules.minLengthMessage || 
        `Must be at least ${rules.minLength} characters`;
    }
    
    // Maximum length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = rules.maxLengthMessage || 
        `Cannot exceed ${rules.maxLength} characters`;
    }
    
    // Custom validation
    if (rules.custom && typeof rules.custom === 'function') {
      const customValidation = rules.custom(value, formData);
      if (customValidation !== true) {
        errors[field] = customValidation;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Usage example:
/*
const validationRules = {
  firstName: { 
    required: true, 
    requiredMessage: 'First name is required',
    name: true 
  },
  email: { 
    required: true, 
    email: true 
  },
  studentId: { 
    required: true, 
    studentId: true 
  },
  password: { 
    required: true, 
    password: true 
  },
  confirmPassword: { 
    required: true,
    custom: (value, formData) => value === formData.password || 'Passwords do not match'
  }
};

const { isValid, errors } = validateForm(formData, validationRules);
*/

export default {
  isEmailValid,
  isStudentIdValid,
  isPasswordStrong,
  isPhoneValid,
  isNameValid,
  isRequired,
  isFutureDate,
  isPastDate,
  isAdult,
  validateForm
};