// backend/utils/validators.js
const { body, param, query, validationResult } = require('express-validator');

// Generic response for validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

// Helper function to validate date format and ensure it's not in the past
const isValidFutureDate = (value) => {
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date instanceof Date && !isNaN(date) && date >= today;
};

// Helper function to validate checkout date is after checkin date
const isCheckoutAfterCheckin = (checkOutDate, { req }) => {
  const checkInDate = new Date(req.body.checkInDate);
  const checkOut = new Date(checkOutDate);
  return checkOut > checkInDate;
};

// Auth validators
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('rollNumber').notEmpty().withMessage('Roll number is required'),
  body('role').optional(),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Enhanced Booking validators
const createBookingValidation = [
  body('roomNumber')
    .notEmpty()
    .withMessage('Room number is required')
    .isString()
    .withMessage('Room number must be a string'),
    
  body('roomType')
    .notEmpty()
    .withMessage('Room type is required')
    .isIn(['double', 'fourth', 'sixth'])
    .withMessage('Room type must be double, fourth, or sixth'),
    
  body('checkInDate')
    .notEmpty()
    .withMessage('Check-in date is required')
    .isISO8601()
    .withMessage('Check-in date must be a valid date')
    .custom(isValidFutureDate)
    .withMessage('Check-in date must be today or in the future'),
    
  body('checkOutDate')
    .notEmpty()
    .withMessage('Check-out date is required')
    .isISO8601()
    .withMessage('Check-out date must be a valid date')
    .custom(isCheckoutAfterCheckin)
    .withMessage('Check-out date must be after check-in date'),
    
  body('numberOfOccupants')
    .notEmpty()
    .withMessage('Number of occupants is required')
    .isInt({ min: 1, max: 10 })
    .withMessage('Number of occupants must be between 1 and 10'),
    
  body('hostelType')
    .notEmpty()
    .withMessage('Hostel type is required')
    .isIn(['boys', 'girls'])
    .withMessage('Hostel type must be boys or girls'),
];

// Booking cancellation validator
const validateCancellation = [
  body('cancellationReason')
    .notEmpty()
    .withMessage('Cancellation reason is required')
    .isLength({ max: 300 })
    .withMessage('Cancellation reason cannot exceed 300 characters'),
];

// Legacy booking validation (for backward compatibility)
const legacyBookingValidation = [
  body('roomType').notEmpty().withMessage('Room type is required'),
  body('startDate').isDate().withMessage('Valid start date is required'),
  body('endDate').isDate().withMessage('Valid end date is required'),
  body('hostelType').notEmpty().withMessage('Hostel type is required'),
];

// ✅ Enhanced Complaint validators (MERGED)
const createComplaintValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
    
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
    
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
    
  body('category')
    .optional()
    .isIn(['Room', 'Food', 'Maintenance', 'Staff', 'Facilities', 'Other'])
    .withMessage('Invalid category selected'),
];

// ✅ Complaint status update validation
const updateComplaintStatusValidation = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Pending', 'In Progress', 'Resolved'])
    .withMessage('Status must be Pending, In Progress, or Resolved'),
    
  body('adminResponse')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Admin response cannot exceed 500 characters'),
];

// Fee validators
const createFeeValidation = [
  body('roomType').notEmpty().withMessage('Room type is required'),
  body('amount')
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Amount must be positive'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('description').optional().isLength({ max: 500 }),
];

// Lost & Found validators
const createLostFoundItemValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .isIn(['lost', 'found'])
    .withMessage('Category must be lost or found'),
  body('location')
    .notEmpty()
    .withMessage('Location is required'),
  body('date')
    .isISO8601()
    .withMessage('Valid date is required'),
];

// Counseling validators
const createCounselorValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('specialization')
    .notEmpty()
    .withMessage('Specialization is required'),
  body('availableDays')
    .isArray()
    .withMessage('Available days must be an array')
    .custom((value) => {
      const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return value.every(day => validDays.includes(day.toLowerCase()));
    })
    .withMessage('Available days must be valid weekday names'),
];

const bookAppointmentValidation = [
  body('counselorId')
    .notEmpty()
    .withMessage('Counselor ID is required')
    .isMongoId()
    .withMessage('Invalid counselor ID format'),
  body('date')
    .isISO8601()
    .withMessage('Valid date is required')
    .custom(isValidFutureDate)
    .withMessage('Appointment date must be in the future'),
  body('timeSlot')
    .notEmpty()
    .withMessage('Time slot is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time slot must be in HH:MM format'),
  body('reason')
    .notEmpty()
    .withMessage('Reason is required')
    .isLength({ max: 300 })
    .withMessage('Reason cannot exceed 300 characters'),
];

// Menu validators
const createMenuValidation = [
  body('date')
    .isISO8601()
    .withMessage('Valid date is required'),
  body('mealType')
    .isIn(['breakfast', 'lunch', 'dinner', 'snacks'])
    .withMessage('Valid meal type is required'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('Items must be a non-empty array'),
  body('items.*')
    .notEmpty()
    .withMessage('Each menu item must not be empty'),
];

// Gallery validators
const uploadImageValidation = [
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),
];

// ID parameter validator
const validateObjectId = (paramName = 'id') => [
  param(paramName).isMongoId().withMessage(`Invalid ${paramName} format`),
];

// Query parameter validators
const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

// Date range validation
const dateRangeValidation = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be valid'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be valid')
    .custom((endDate, { req }) => {
      if (req.query.startDate && endDate) {
        return new Date(endDate) >= new Date(req.query.startDate);
      }
      return true;
    })
    .withMessage('End date must be after start date'),
];

// ✅ Additional validation helper functions for complaints
const validateComplaintData = (data) => {
  const errors = [];
  const { title, description, priority, category } = data;

  // Title validation
  if (!title || title.trim().length === 0) {
    errors.push('Complaint title is required');
  } else if (title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  } else if (title.trim().length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }

  // Description validation
  if (!description || description.trim().length === 0) {
    errors.push('Complaint description is required');
  } else if (description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  } else if (description.trim().length > 1000) {
    errors.push('Description cannot exceed 1000 characters');
  }

  // Priority validation (optional)
  if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
    errors.push('Priority must be Low, Medium, or High');
  }

  // Category validation (optional)
  if (category && !['Room', 'Food', 'Maintenance', 'Staff', 'Facilities', 'Other'].includes(category)) {
    errors.push('Invalid category selected');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateComplaintStatus = (status) => {
  const validStatuses = ['Pending', 'In Progress', 'Resolved'];
  
  if (!status) {
    return {
      isValid: false,
      errors: ['Status is required']
    };
  }

  if (!validStatuses.includes(status)) {
    return {
      isValid: false,
      errors: [`Status must be one of: ${validStatuses.join(', ')}`]
    };
  }

  return {
    isValid: true,
    errors: []
  };
};

const validateAdminResponse = (response) => {
  const errors = [];

  if (response && response.trim().length > 500) {
    errors.push('Admin response cannot exceed 500 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitize complaint input
const sanitizeComplaintInput = (data) => {
  return {
    title: data.title ? data.title.trim() : '',
    description: data.description ? data.description.trim() : '',
    priority: data.priority || 'Medium',
    category: data.category || 'Other'
  };
};

module.exports = {
  validateRequest,
  registerValidation,
  loginValidation,
  createBookingValidation,
  validateCancellation,
  legacyBookingValidation, // For backward compatibility
  createComplaintValidation, // ✅ Enhanced complaint validation
  updateComplaintStatusValidation, // ✅ New complaint status validation
  createFeeValidation,
  createLostFoundItemValidation,
  createCounselorValidation,
  bookAppointmentValidation,
  createMenuValidation,
  uploadImageValidation,
  validateObjectId,
  paginationValidation,
  dateRangeValidation,
  // ✅ Additional complaint helper functions
  validateComplaintData,
  validateComplaintStatus,
  validateAdminResponse,
  sanitizeComplaintInput,
};