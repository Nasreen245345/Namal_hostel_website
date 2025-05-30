// routes/counselingRoutes.js
const express = require('express');

// Import auth middleware functions
const {
  auth,
  counselorAuth,
  authorize,
  checkAppointmentOwnership,
  checkAppointmentModifiable,
  validateAppointmentStatusTransition,
  rateLimitAppointmentBooking,
  canBookAppointment
} = require('../middleware/auth');

const router = express.Router();

// Try to import controller functions with error handling
let counselingController;
try {
  counselingController = require('../controllers/counselingController');
  console.log('Counseling Controller functions check:', {
    getAllCounselors: typeof counselingController.getAllCounselors,
    getCounselorDetails: typeof counselingController.getCounselorDetails,
    bookAppointment: typeof counselingController.bookAppointment,
    getUserAppointments: typeof counselingController.getUserAppointments,
    cancelAppointment: typeof counselingController.cancelAppointment,
    updateAppointmentStatus: typeof counselingController.updateAppointmentStatus,
    getCounselorAppointments: typeof counselingController.getCounselorAppointments
  });
} catch (error) {
  console.error('Error importing counseling controller:', error.message);
  // Create placeholder functions to prevent crashes
  counselingController = {};
}

// Extract functions with fallbacks
const {
  getAllCounselors = (req, res) => res.status(501).json({ success: false, message: 'getAllCounselors not implemented' }),
  getCounselorDetails = (req, res) => res.status(501).json({ success: false, message: 'getCounselorDetails not implemented' }),
  bookAppointment = (req, res) => res.status(501).json({ success: false, message: 'bookAppointment not implemented' }),
  getUserAppointments = (req, res) => res.status(501).json({ success: false, message: 'getUserAppointments not implemented' }),
  cancelAppointment = (req, res) => res.status(501).json({ success: false, message: 'cancelAppointment not implemented' }),
  updateAppointmentStatus = (req, res) => res.status(501).json({ success: false, message: 'updateAppointmentStatus not implemented' }),
  getCounselorAppointments = (req, res) => res.status(501).json({ success: false, message: 'getCounselorAppointments not implemented' })
} = counselingController;

// Public routes
router.get('/counselors', getAllCounselors);
router.get('/counselors/:counselorId', getCounselorDetails);

// Protected routes (require authentication)
router.post('/appointments', auth, canBookAppointment, rateLimitAppointmentBooking, bookAppointment);
router.get('/appointments/my', auth, getUserAppointments);
router.get('/appointments/user', auth, getUserAppointments); // Legacy route
router.delete('/appointments/:appointmentId', auth, checkAppointmentOwnership, checkAppointmentModifiable, cancelAppointment);

// Counselor/Admin routes
router.patch('/appointments/:appointmentId/status', 
  auth, 
  authorize('counselor', 'admin'), 
  checkAppointmentOwnership, 
  validateAppointmentStatusTransition, 
  updateAppointmentStatus
);

router.get('/appointments/counselor', counselorAuth, getCounselorAppointments);
router.get('/counselors/:counselorId/appointments', counselorAuth, getCounselorAppointments);

// Additional routes that might be useful
router.patch('/appointments/:appointmentId/reschedule', auth, (req, res) => {
  res.status(501).json({ 
    success: false, 
    message: 'Reschedule appointment functionality not yet implemented',
    appointmentId: req.params.appointmentId
  });
});

router.get('/stats', auth, (req, res) => {
  res.status(501).json({ 
    success: false, 
    message: 'Counseling statistics not yet implemented'
  });
});

// Test route (remove in production)
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Counseling routes are working',
    timestamp: new Date().toISOString(),
    controllerStatus: counselingController ? 'Loaded' : 'Not loaded',
    availableRoutes: [
      'GET /api/counseling/counselors - Get all counselors',
      'GET /api/counseling/counselors/:counselorId - Get counselor details',
      'POST /api/counseling/appointments - Book appointment (requires auth)',
      'GET /api/counseling/appointments/my - Get user appointments (requires auth)',
      'GET /api/counseling/appointments/user - Get user appointments legacy (requires auth)',
      'DELETE /api/counseling/appointments/:appointmentId - Cancel appointment (requires auth)',
      'PATCH /api/counseling/appointments/:appointmentId/status - Update status (requires auth)',
      'PATCH /api/counseling/appointments/:appointmentId/reschedule - Reschedule (requires auth)',
      'GET /api/counseling/appointments/counselor - Get counselor appointments (requires auth)',
      'GET /api/counseling/counselors/:counselorId/appointments - Get counselor appointments (requires auth)',
      'GET /api/counseling/stats - Get statistics (requires auth)'
    ]
  });
});

module.exports = router;