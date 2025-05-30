const express = require('express');
const router = express.Router();

// Import middleware
const { auth } = require('../middleware/auth');

// Import dashboard controller
const {
  getDashboardOverview,
  getRecentActivity,
  getDashboardStats,
  getQuickActions
} = require('../controllers/dashboardController');

// =================== Dashboard Routes ===================

/**
 * @route   GET /dashboard/overview
 * @desc    Get complete dashboard overview for logged-in user
 * @access  Private (requires authentication)
 */
router.get('/overview', auth, getDashboardOverview);

/**
 * @route   GET /dashboard/activity
 * @desc    Get user's recent activity (complaints, bookings, etc.)
 * @access  Private (requires authentication)
 * @query   limit - Number of activities to return (default: 5)
 */
router.get('/activity', auth, getRecentActivity);

/**
 * @route   GET /dashboard/stats
 * @desc    Get dashboard statistics for logged-in user
 * @access  Private (requires authentication)
 */
router.get('/stats', auth, getDashboardStats);

/**
 * @route   GET /dashboard/quick-actions
 * @desc    Get available quick actions for the user
 * @access  Private (requires authentication)
 */
router.get('/quick-actions', auth, getQuickActions);

/**
 * @route   GET /dashboard/notifications
 * @desc    Get user notifications
 * @access  Private (requires authentication)
 */
router.get('/notifications', auth, async (req, res) => {
  try {
    // This should be implemented in your dashboard controller
    // For now, returning sample data
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notifications'
    });
  }
});

/**
 * @route   PATCH /dashboard/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private (requires authentication)
 */
router.patch('/notifications/:id/read', auth, async (req, res) => {
  try {
    const { id } = req.params;
    // This should be implemented in your dashboard controller
    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark notification as read'
    });
  }
});

/**
 * @route   PATCH /dashboard/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private (requires authentication)
 */
router.patch('/notifications/read-all', auth, async (req, res) => {
  try {
    // This should be implemented in your dashboard controller
    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark all notifications as read'
    });
  }
});

// =================== Health Check Route ===================

/**
 * @route   GET /dashboard/health
 * @desc    Dashboard service health check
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Dashboard service is operational',
    timestamp: new Date().toISOString(),
    service: 'dashboard',
    version: '1.0.0',
    availableEndpoints: [
      'GET /dashboard/overview - Get complete dashboard data (auth required)',
      'GET /dashboard/activity - Get recent user activity (auth required)',
      'GET /dashboard/stats - Get user statistics (auth required)',
      'GET /dashboard/quick-actions - Get available quick actions (auth required)',
      'GET /dashboard/notifications - Get user notifications (auth required)',
      'PATCH /dashboard/notifications/:id/read - Mark notification as read (auth required)',
      'PATCH /dashboard/notifications/read-all - Mark all notifications as read (auth required)',
      'GET /dashboard/health - Service health check (public)'
    ]
  });
});

module.exports = router;