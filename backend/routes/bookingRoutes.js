const express = require('express');
const {
  getAvailability,
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  testDatabaseConnection // Add this for debugging
} = require('../controllers/bookingController');

const { protect, authorize } = require('../middleware/auth');
const { validateBooking } = require('../middleware/validate');

const router = express.Router();

// Public routes
router.get('/availability', getAvailability);

// Protected routes (require authentication)
router.use(protect);

// Debug route - ADD THIS TEMPORARILY
router.get('/debug/test-db', testDatabaseConnection);

// Student routes
router.post('/', validateBooking, createBooking);
router.get('/my-bookings', getMyBookings);
router.get('/:id', getBookingById);
router.put('/:id/cancel', cancelBooking);

// Admin routes
router.get('/admin/all', authorize('admin'), getAllBookings);
router.put('/:id/status', authorize('admin'), updateBookingStatus);

module.exports = router;