// middleware/validate.js

// Booking validation
const validateBooking = (req, res, next) => {
  const { roomType, hostelType, checkInDate, checkOutDate, duration } = req.body;

  // Check required fields
  if (!roomType || !hostelType || !checkInDate || !checkOutDate || !duration) {
    return res.status(400).json({
      success: false,
      message: 'Room type, hostel type, check-in date, check-out date, and duration are required'
    });
  }

  // Validate room type
  const validRoomTypes = ['single', 'double', 'fourth', 'sixth'];
  if (!validRoomTypes.includes(roomType)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid room type. Must be one of: ' + validRoomTypes.join(', ')
    });
  }

  // Validate hostel type
  const validHostelTypes = ['boys', 'girls'];
  if (!validHostelTypes.includes(hostelType)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid hostel type. Must be either boys or girls'
    });
  }

  // Validate dates
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid date format'
    });
  }

  if (checkIn < today) {
    return res.status(400).json({
      success: false,
      message: 'Check-in date cannot be in the past'
    });
  }

  if (checkOut <= checkIn) {
    return res.status(400).json({
      success: false,
      message: 'Check-out date must be after check-in date'
    });
  }

  // Validate duration
  if (typeof duration !== 'number' || duration < 1) {
    return res.status(400).json({
      success: false,
      message: 'Duration must be a positive number'
    });
  }

  next();
};

// FIXED: Updated complaint validation to match frontend field names
const validateComplaint = (req, res, next) => {
  const { 
    studentName,
    studentId,
    email,
    phone,
    roomNumber,
    complaintType,  // Changed from 'category' to 'complaintType'
    priority,
    title,
    description,
    expectedResolutionDate
  } = req.body;

  const errors = [];

  // Validate required fields
  if (!studentName || !studentName.toString().trim()) {
    errors.push({ field: 'studentName', message: 'Student name is required' });
  }

  if (!studentId || !studentId.toString().trim()) {
    errors.push({ field: 'studentId', message: 'Student ID is required' });
  }

  if (!email || !email.toString().trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.toString().trim())) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  if (!phone || !phone.toString().trim()) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone.toString().trim())) {
      errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
    }
  }

  if (!roomNumber || !roomNumber.toString().trim()) {
    errors.push({ field: 'roomNumber', message: 'Room number is required' });
  }

  if (!complaintType) {  // Changed from 'category' to 'complaintType'
    errors.push({ field: 'complaintType', message: 'Complaint category is required' });
  }

  if (!title || !title.toString().trim()) {
    errors.push({ field: 'title', message: 'Complaint title is required' });
  }

  if (!description || !description.toString().trim()) {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  if (!expectedResolutionDate) {
    errors.push({ field: 'expectedResolutionDate', message: 'Expected resolution date is required' });
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // Validate title length
  const titleStr = title.toString().trim();
  if (titleStr.length < 5) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'title', message: 'Title must be at least 5 characters long' }]
    });
  }
  if (titleStr.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'title', message: 'Title cannot exceed 100 characters' }]
    });
  }

  // Validate description length
  const descriptionStr = description.toString().trim();
  if (descriptionStr.length < 20) {  // Updated to match frontend validation
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'description', message: 'Description must be at least 20 characters long' }]
    });
  }
  if (descriptionStr.length > 1000) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'description', message: 'Description cannot exceed 1000 characters' }]
    });
  }

  // Validate complaint type (updated categories to match frontend)
  const validComplaintTypes = [
    'plumbing_issues',
    'electrical_problems', 
    'furniture_damage',
    'cleaning_services',
    'wifi_connectivity',
    'air_conditioning',
    'noise_complaints',
    'security_concerns',
    'roommate_issues',
    'others'
  ];
  
  if (!validComplaintTypes.includes(complaintType)) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ 
        field: 'complaintType', 
        message: 'Invalid complaint type. Must be one of: ' + validComplaintTypes.join(', ')
      }]
    });
  }

  // Validate priority (optional, but validate if provided)
  if (priority) {
    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: [{ 
          field: 'priority', 
          message: 'Invalid priority. Must be one of: ' + validPriorities.join(', ')
        }]
      });
    }
  }

  // Validate expected resolution date
  const expectedDate = new Date(expectedResolutionDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(expectedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'expectedResolutionDate', message: 'Please enter a valid date' }]
    });
  }

  if (expectedDate < today) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'expectedResolutionDate', message: 'Expected resolution date cannot be in the past' }]
    });
  }

  // Clean up the request body by trimming strings
  req.body.studentName = studentName.toString().trim();
  req.body.studentId = studentId.toString().trim();
  req.body.email = email.toString().trim();
  req.body.phone = phone.toString().trim();
  req.body.roomNumber = roomNumber.toString().trim();
  req.body.title = titleStr;
  req.body.description = descriptionStr;

  next();
};

// Complaint status update validation (for admin)
const validateComplaintUpdate = (req, res, next) => {
  const { status, adminNotes, assignedTo } = req.body;

  // Check required status field
  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status is required',
      errors: [{ field: 'status', message: 'Complaint status is required' }]
    });
  }

  // Validate status (updated to match controller expectations)
  const validStatuses = ['pending', 'in_progress', 'resolved', 'closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ 
        field: 'status', 
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      }]
    });
  }

  // Validate admin notes (optional)
  if (adminNotes) {
    const notesStr = adminNotes.toString().trim();
    if (notesStr.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'adminNotes', message: 'Admin notes cannot exceed 500 characters' }]
      });
    }
    req.body.adminNotes = notesStr;
  }

  next();
};

// General ID parameter validation
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  // Check if ID is a valid MongoDB ObjectId format
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }

  next();
};

// Query parameter validation for pagination and filters
const validateQueryParams = (req, res, next) => {
  const { page, limit, status, complaintType, priority } = req.query;

  // Validate page
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      message: 'Page must be a positive number'
    });
  }

  // Validate limit
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return res.status(400).json({
      success: false,
      message: 'Limit must be a number between 1 and 100'
    });
  }

  // Validate status filter
  if (status) {
    const validStatuses = ['pending', 'in_progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status filter. Must be one of: ' + validStatuses.join(', ')
      });
    }
  }

  // Validate complaint type filter (updated field name)
  if (complaintType) {
    const validComplaintTypes = [
      'plumbing_issues',
      'electrical_problems', 
      'furniture_damage',
      'cleaning_services',
      'wifi_connectivity',
      'air_conditioning',
      'noise_complaints',
      'security_concerns',
      'roommate_issues',
      'others'
    ];
    if (!validComplaintTypes.includes(complaintType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid complaint type filter. Must be one of: ' + validComplaintTypes.join(', ')
      });
    }
  }

  // Validate priority filter
  if (priority) {
    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority filter. Must be one of: ' + validPriorities.join(', ')
      });
    }
  }

  next();
};

module.exports = {
  validateBooking,
  validateComplaint,
  validateComplaintUpdate,
  validateObjectId,
  validateQueryParams
};