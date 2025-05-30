const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Notification = require('../models/Notification');
// Note: Assuming Booking model exists - adjust import path as needed
// const Booking = require('../models/Booking');

/**
 * @desc    Get dashboard overview for logged-in user
 * @route   GET /api/dashboard/overview
 * @access  Private (requires authentication)
 */
const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    // Parallel data fetching for better performance
    const [user, bookings, complaints, notifications] = await Promise.all([
      // Get user profile (exclude sensitive fields)
      User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpire'),
      
      // Get user's bookings (uncomment when Booking model is available)
      // Booking.find({ userId: userId }).sort({ createdAt: -1 }).limit(10),
      Promise.resolve([]), // Temporary placeholder for bookings
      
      // Get user's complaints
      Complaint.find({ studentId: userId })
        .select('complaintNumber title category priority status createdAt resolvedAt')
        .sort({ createdAt: -1 })
        .limit(10),
      
      // Get user's notifications (assuming notifications exist)
      // Notification.find({ userId: userId }).sort({ createdAt: -1 }).limit(10)
      Promise.resolve([]) // Temporary placeholder for notifications
    ]);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate summary statistics
    const stats = {
      totalBookings: bookings.length,
      totalComplaints: complaints.length,
      pendingComplaints: complaints.filter(c => c.status === 'pending').length,
      resolvedComplaints: complaints.filter(c => c.status === 'resolved').length,
      unreadNotifications: notifications.filter(n => !n.isRead).length || 0
    };

    // Prepare response data
    const dashboardData = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        phone: user.phone,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      },
      bookings: bookings,
      complaints: complaints,
      notifications: notifications,
      stats: stats,
      lastUpdated: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: dashboardData,
      message: 'Dashboard data retrieved successfully'
    });

  } catch (error) {
    console.error('Dashboard overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving dashboard data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * @desc    Get user's recent activity
 * @route   GET /api/dashboard/activity
 * @access  Private (requires authentication)
 */
const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 5;

    // Get recent complaints and bookings
    const [recentComplaints, recentBookings] = await Promise.all([
      Complaint.find({ studentId: userId })
        .select('complaintNumber title category status createdAt')
        .sort({ createdAt: -1 })
        .limit(limit),
      
      // Booking.find({ userId: userId })
      //   .select('bookingNumber type status createdAt')
      //   .sort({ createdAt: -1 })
      //   .limit(limit)
      Promise.resolve([]) // Temporary placeholder
    ]);

    // Combine and sort activities
    const activities = [
      ...recentComplaints.map(complaint => ({
        type: 'complaint',
        id: complaint._id,
        title: complaint.title,
        reference: complaint.complaintNumber,
        status: complaint.status,
        category: complaint.category,
        date: complaint.createdAt
      })),
      ...recentBookings.map(booking => ({
        type: 'booking',
        id: booking._id,
        title: `${booking.type} Booking`,
        reference: booking.bookingNumber,
        status: booking.status,
        date: booking.createdAt
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);

    res.status(200).json({
      success: true,
      data: {
        activities,
        totalActivities: activities.length
      },
      message: 'Recent activity retrieved successfully'
    });

  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving recent activity',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private (requires authentication)
 */
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get counts and statistics
    const [
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      totalBookings,
      activeBookings
    ] = await Promise.all([
      Complaint.countDocuments({ studentId: userId }),
      Complaint.countDocuments({ studentId: userId, status: 'pending' }),
      Complaint.countDocuments({ studentId: userId, status: 'resolved' }),
      // Booking.countDocuments({ userId: userId }),
      // Booking.countDocuments({ userId: userId, status: 'active' })
      Promise.resolve(0), // Temporary placeholder
      Promise.resolve(0)  // Temporary placeholder
    ]);

    // Calculate complaint resolution rate
    const resolutionRate = totalComplaints > 0 
      ? Math.round((resolvedComplaints / totalComplaints) * 100) 
      : 0;

    const stats = {
      complaints: {
        total: totalComplaints,
        pending: pendingComplaints,
        resolved: resolvedComplaints,
        resolutionRate: `${resolutionRate}%`
      },
      bookings: {
        total: totalBookings,
        active: activeBookings,
        completed: totalBookings - activeBookings
      },
      accountStatus: {
        isActive: req.user.isActive,
        memberSince: req.user.createdAt,
        lastLogin: req.user.lastLogin
      }
    };

    res.status(200).json({
      success: true,
      data: stats,
      message: 'Dashboard statistics retrieved successfully'
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving dashboard statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

/**
 * @desc    Get user's quick actions/shortcuts
 * @route   GET /api/dashboard/quick-actions
 * @access  Private (requires authentication)
 */
const getQuickActions = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = req.user;

    // Define available quick actions based on user role and status
    const quickActions = [
      {
        id: 'new-complaint',
        title: 'Submit New Complaint',
        description: 'Report an issue or request assistance',
        icon: 'complaint',
        endpoint: '/api/complaints',
        method: 'POST',
        enabled: user.isActive && user.role === 'student'
      },
      {
        id: 'view-complaints',
        title: 'View My Complaints',
        description: 'Check status of your submitted complaints',
        icon: 'list',
        endpoint: '/api/complaints/my',
        method: 'GET',
        enabled: true
      },
      {
        id: 'new-booking',
        title: 'Make Booking',
        description: 'Book facilities or rooms',
        icon: 'booking',
        endpoint: '/api/bookings',
        method: 'POST',
        enabled: user.isActive && user.role === 'student'
      },
      {
        id: 'profile',
        title: 'Update Profile',
        description: 'Manage your account information',
        icon: 'profile',
        endpoint: '/api/auth/profile',
        method: 'PUT',
        enabled: true
      },
      {
        id: 'counseling',
        title: 'Book Counseling',
        description: 'Schedule a counseling session',
        icon: 'counseling',
        endpoint: '/api/counseling/appointments',
        method: 'POST',
        enabled: user.isActive && user.role === 'student'
      }
    ];

    // Filter enabled actions
    const availableActions = quickActions.filter(action => action.enabled);

    res.status(200).json({
      success: true,
      data: {
        quickActions: availableActions,
        totalActions: availableActions.length
      },
      message: 'Quick actions retrieved successfully'
    });

  } catch (error) {
    console.error('Quick actions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving quick actions',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  getDashboardOverview,
  getRecentActivity,
  getDashboardStats,
  getQuickActions
};