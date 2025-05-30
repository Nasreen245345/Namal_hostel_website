const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Test route to check if controller functions are imported correctly
console.log('Controller functions check:', {
  register: typeof register,
  login: typeof login,
  getMe: typeof getMe,
  updateProfile: typeof updateProfile,
  changePassword: typeof changePassword,
  forgotPassword: typeof forgotPassword,
  resetPassword: typeof resetPassword
});

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/update-profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;