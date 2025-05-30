// Combined middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Counselor = require('../models/Counselor');

// =================== General Auth Middleware ===================
const auth = async (req, res, next) => {
  try {
    let token;

    // Check for token in multiple places
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Token is valid but user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ success: false, message: 'Server error in authentication' });
  }
};

// =================== Admin Auth Middleware ===================
const adminAuth = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      auth(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

// =================== Counselor Auth Middleware ===================
const counselorAuth = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      auth(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (req.user.role !== 'counselor' && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Counselor privileges required.' 
      });
    }

    // If user is a counselor, get counselor details
    if (req.user.role === 'counselor') {
      const counselor = await Counselor.findOne({ userId: req.user._id });
      if (!counselor || !counselor.isActive) {
        return res.status(403).json({ 
          success: false, 
          message: 'Counselor account is not active or not found.' 
        });
      }
      req.counselor = counselor;
    }

    next();
  } catch (error) {
    console.error('Counselor auth error:', error);
    return res.status(500).json({ success: false, message: 'Server error in counselor authentication' });
  }
};

// =================== Advanced Auth Middleware ===================
const protect = auth;

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role '${req.user.role}' is not authorized to access this route` 
      });
    }
    next();
  };
};

// =================== Counseling-Specific Middleware ===================
const checkAppointmentOwnership = async (req, res, next) => {
  try {
    const appointmentId = req.params.appointmentId;
    if (!appointmentId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Appointment ID is required' 
      });
    }

    // Find the counselor with this appointment
    const counselor = await Counselor.findOne({
      'appointments._id': appointmentId
    });

    if (!counselor) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    const appointment = counselor.appointments.id(appointmentId);
    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    // Check if user owns the appointment or is a counselor/admin
    const isOwner = appointment.studentId.toString() === req.user._id.toString();
    const isCounselor = req.user.role === 'counselor' && counselor.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isCounselor && !isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this appointment' 
      });
    }

    req.appointment = appointment;
    req.appointmentCounselor = counselor;
    next();
  } catch (error) {
    console.error('Appointment ownership check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error checking appointment ownership', 
      error: error.message 
    });
  }
};

const checkAppointmentModifiable = async (req, res, next) => {
  try {
    const appointment = req.appointment;
    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    // Admin can modify any appointment
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if appointment can be modified based on status
    const nonModifiableStatuses = ['completed', 'cancelled'];
    if (nonModifiableStatuses.includes(appointment.status)) {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot modify ${appointment.status} appointment` 
      });
    }

    // Check if appointment is too close to modify (within 2 hours)
    const appointmentDateTime = new Date(appointment.date);
    const [hours, minutes] = appointment.timeSlot.split(':').map(Number);
    appointmentDateTime.setHours(hours, minutes);
    
    const now = new Date();
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff <= 2 && hoursDiff >= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot modify appointment within 2 hours of scheduled time' 
      });
    }

    next();
  } catch (error) {
    console.error('Appointment modifiable check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error checking appointment status', 
      error: error.message 
    });
  }
};

const validateAppointmentStatusTransition = (req, res, next) => {
  const { status } = req.body;
  if (!status) return next();

  const appointment = req.appointment;
  const currentStatus = appointment.status;

  const validTransitions = {
    'pending': ['approved', 'rejected', 'cancelled'],
    'approved': ['completed', 'cancelled', 'rescheduled'],
    'rejected': ['pending'],
    'completed': [], // Cannot change from completed
    'cancelled': ['pending'], // Can reopen cancelled appointments
    'rescheduled': ['approved', 'cancelled']
  };

  if (!validTransitions[currentStatus] || !validTransitions[currentStatus].includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status transition from '${currentStatus}' to '${status}'`
    });
  }
  next();
};

// Rate limiting for appointment booking
const appointmentBookingAttempts = new Map();

const rateLimitAppointmentBooking = (req, res, next) => {
  const userId = req.user._id.toString();
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxAttempts = 5; // Max 5 booking attempts per hour

  if (!appointmentBookingAttempts.has(userId)) {
    appointmentBookingAttempts.set(userId, []);
  }

  const userAttempts = appointmentBookingAttempts.get(userId).filter(ts => now - ts < windowMs);

  if (userAttempts.length >= maxAttempts) {
    return res.status(429).json({
      success: false,
      message: 'Too many appointment booking attempts. Please try again later.',
      retryAfter: Math.ceil((windowMs - (now - userAttempts[0])) / 1000)
    });
  }

  userAttempts.push(now);
  appointmentBookingAttempts.set(userId, userAttempts);
  next();
};

const canBookAppointment = async (req, res, next) => {
  try {
    const user = req.user;

    // Check if user account is active
    if (user.status === 'inactive' || user.status === 'suspended') {
      return res.status(403).json({ 
        success: false, 
        message: 'Your account is not active. Please contact administration.' 
      });
    }

    // Check if email is verified
    if (user.emailVerified === false) {
      return res.status(403).json({ 
        success: false, 
        message: 'Please verify your email address before booking appointments.' 
      });
    }

    // Check if user is restricted from booking appointments
    if (user.appointmentRestrictedUntil && new Date(user.appointmentRestrictedUntil) > new Date()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Your account is temporarily restricted from booking appointments.',
        restrictedUntil: user.appointmentRestrictedUntil 
      });
    }

    // Check for pending appointments limit
    const counselors = await Counselor.find({
      'appointments.studentId': user._id,
      'appointments.status': 'pending'
    });

    let pendingCount = 0;
    counselors.forEach(counselor => {
      pendingCount += counselor.appointments.filter(
        apt => apt.studentId.toString() === user._id.toString() && apt.status === 'pending'
      ).length;
    });

    if (pendingCount >= 3) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have reached the maximum limit of pending appointments (3). Please wait for approval or cancel existing appointments.' 
      });
    }

    next();
  } catch (error) {
    console.error('Can book appointment check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error checking appointment booking permissions', 
      error: error.message 
    });
  }
};

// =================== Complaint-Specific Middleware (Existing) ===================
const checkComplaintOwnership = async (req, res, next) => {
  try {
    const complaintId = req.params.id;
    if (!complaintId) {
      return res.status(400).json({ success: false, message: 'Complaint ID is required' });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    if (complaint.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this complaint' });
    }

    req.complaint = complaint;
    next();
  } catch (error) {
    console.error('Complaint ownership check error:', error);
    res.status(500).json({ success: false, message: 'Error checking complaint ownership', error: error.message });
  }
};

const checkComplaintModifiable = async (req, res, next) => {
  try {
    const complaint = req.complaint || await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    if (req.user.role === 'admin') {
      req.complaint = complaint;
      return next();
    }

    if (complaint.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Can only modify open complaints' });
    }

    req.complaint = complaint;
    next();
  } catch (error) {
    console.error('Complaint modifiable check error:', error);
    res.status(500).json({ success: false, message: 'Error checking complaint status', error: error.message });
  }
};

const checkComplaintAssignment = async (req, res, next) => {
  try {
    const complaint = req.complaint || await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    if (req.user.role === 'superadmin') {
      req.complaint = complaint;
      return next();
    }

    if (req.user.role === 'admin' && complaint.assignedTo && complaint.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'This complaint is assigned to another admin' });
    }

    req.complaint = complaint;
    next();
  } catch (error) {
    console.error('Complaint assignment check error:', error);
    res.status(500).json({ success: false, message: 'Error checking complaint assignment', error: error.message });
  }
};

const complaintCreationAttempts = new Map();

const rateLimitComplaintCreation = (req, res, next) => {
  const userId = req.user._id.toString();
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 3;

  if (!complaintCreationAttempts.has(userId)) {
    complaintCreationAttempts.set(userId, []);
  }

  const userAttempts = complaintCreationAttempts.get(userId).filter(ts => now - ts < windowMs);

  if (userAttempts.length >= maxAttempts) {
    return res.status(429).json({
      success: false,
      message: 'Too many complaint creation attempts. Please try again later.',
      retryAfter: Math.ceil((windowMs - (now - userAttempts[0])) / 1000)
    });
  }

  userAttempts.push(now);
  complaintCreationAttempts.set(userId, userAttempts);
  next();
};

const validateStatusTransition = (req, res, next) => {
  const { status } = req.body;
  if (!status) return next();

  const complaint = req.complaint;
  const currentStatus = complaint.status;

  const validTransitions = {
    'open': ['in-progress', 'resolved', 'closed'],
    'in-progress': ['resolved', 'closed', 'open'],
    'resolved': ['closed', 'open'],
    'closed': ['open']
  };

  if (!validTransitions[currentStatus] || !validTransitions[currentStatus].includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status transition from '${currentStatus}' to '${status}'`
    });
  }
  next();
};

const canCreateComplaint = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.status === 'inactive' || user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your account is not active. Please contact administration.' });
    }

    if (user.emailVerified === false) {
      return res.status(403).json({ success: false, message: 'Please verify your email address before creating complaints.' });
    }

    if (user.restrictedUntil && new Date(user.restrictedUntil) > new Date()) {
      return res.status(403).json({ success: false, message: 'Your account is temporarily restricted from creating complaints.', restrictedUntil: user.restrictedUntil });
    }

    next();
  } catch (error) {
    console.error('Can create complaint check error:', error);
    res.status(500).json({ success: false, message: 'Error checking user permissions', error: error.message });
  }
};

// =================== Cleanup Functions ===================
// Cleanup rate limiting maps periodically
setInterval(() => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  
  // Clean complaint attempts
  for (const [userId, attempts] of complaintCreationAttempts.entries()) {
    const recentAttempts = attempts.filter(ts => now - ts < windowMs);
    if (recentAttempts.length === 0) complaintCreationAttempts.delete(userId);
    else complaintCreationAttempts.set(userId, recentAttempts);
  }
  
  // Clean appointment booking attempts
  const appointmentWindowMs = 60 * 60 * 1000; // 1 hour
  for (const [userId, attempts] of appointmentBookingAttempts.entries()) {
    const recentAttempts = attempts.filter(ts => now - ts < appointmentWindowMs);
    if (recentAttempts.length === 0) appointmentBookingAttempts.delete(userId);
    else appointmentBookingAttempts.set(userId, recentAttempts);
  }
}, 5 * 60 * 1000);

module.exports = {
  // General auth
  auth,
  protect,
  adminAuth,
  counselorAuth,
  authorize,
  
  // Counseling-specific
  checkAppointmentOwnership,
  checkAppointmentModifiable,
  validateAppointmentStatusTransition,
  rateLimitAppointmentBooking,
  canBookAppointment,
  
  // Complaint-specific (existing)
  checkComplaintOwnership,
  checkComplaintModifiable,
  checkComplaintAssignment,
  rateLimitComplaintCreation,
  validateStatusTransition,
  canCreateComplaint
};