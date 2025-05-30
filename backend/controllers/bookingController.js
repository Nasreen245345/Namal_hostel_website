const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Get available rooms
// @route   GET /api/bookings/availability
// @access  Public
const getAvailability = async (req, res) => {
  try {
    const { roomType, hostelType, checkInDate, checkOutDate } = req.query;

    // Validate required parameters
    if (!roomType || !hostelType || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'Room type, hostel type, check-in date, and check-out date are required'
      });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

    const availability = await Booking.checkAvailability(roomType, hostelType, checkIn, checkOut);

    // Room pricing
    const roomPrices = {
      'double': 15000,
      'fourth': 12000,
      'sixth': 10000
    };

    res.status(200).json({
      success: true,
      data: {
        roomType,
        hostelType,
        available: availability.available,
        availableRooms: availability.availableRooms,
        totalCapacity: availability.totalCapacity,
        pricePerMonth: roomPrices[roomType],
        checkInDate: checkIn,
        checkOutDate: checkOut
      }
    });

  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking availability'
    });
  }
};

// @desc    Create new booking with enhanced debugging
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    console.log('=== CREATE BOOKING DEBUG ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('User from token:', req.user ? {id: req.user.id, email: req.user.email} : 'No user found');

    const {
      roomType,
      hostelType,
      checkInDate,
      checkOutDate,
      duration,
      specialRequests
    } = req.body;

    // Validate required fields
    if (!roomType || !hostelType || !checkInDate || !checkOutDate || !duration) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
        received: { roomType, hostelType, checkInDate, checkOutDate, duration }
      });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log('Date validation:', {
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      today: today.toISOString()
    });

    if (checkIn < today) {
      console.log('❌ Check-in date in past');
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }

    if (checkOut <= checkIn) {
      console.log('❌ Invalid date range');
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    // Check if user already has an active booking
    console.log('Checking existing bookings for user:', req.user.id);
    const existingBooking = await Booking.findOne({
      userId: req.user.id,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      console.log('❌ User already has active booking:', existingBooking);
      return res.status(400).json({
        success: false,
        message: 'You already have an active booking. Please cancel it first.'
      });
    }

    // Check availability
    console.log('Checking availability...');
    let availability;
    try {
      availability = await Booking.checkAvailability(roomType, hostelType, checkIn, checkOut);
      console.log('Availability result:', availability);
    } catch (availabilityError) {
      console.error('❌ Availability check failed:', availabilityError);
      return res.status(500).json({
        success: false,
        message: 'Error checking availability: ' + availabilityError.message
      });
    }
    
    if (!availability.available) {
      console.log('❌ No rooms available');
      return res.status(400).json({
        success: false,
        message: `No ${roomType} rooms available for ${hostelType} hostel in the selected dates`
      });
    }

    // Generate room number
    const roomNumber = `${hostelType.toUpperCase()}-${roomType.toUpperCase()}-${Date.now().toString().slice(-4)}`;
    console.log('Generated room number:', roomNumber);

    // Prepare booking data
    const bookingData = {
      userId: req.user.id,
      roomType,
      roomNumber,
      hostelType,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      duration,
      specialRequests: specialRequests || ''
    };

    console.log('Creating booking with data:', JSON.stringify(bookingData, null, 2));

    // Create booking
    const booking = await Booking.create(bookingData);
    console.log('✅ Booking created successfully:', booking);

    // Populate user details
    await booking.populate('userId', 'name email studentId');
    console.log('✅ Booking populated:', booking);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });

  } catch (error) {
    console.error('❌ Create booking error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { userId: req.user.id };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'name email studentId')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBookings: total
      }
    });

  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'name email studentId phone')
      .populate('approvedBy', 'name email')
      .populate('cancelledBy', 'name email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed booking'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancelledBy = req.user.id;
    booking.cancellationReason = cancellationReason;

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });

  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings/admin/all
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const { status, roomType, hostelType, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (roomType) query.roomType = roomType;
    if (hostelType) query.hostelType = hostelType;

    const bookings = await Booking.find(query)
      .populate('userId', 'name email studentId phone')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBookings: total
      }
    });

  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

// @desc    Approve/Reject booking (Admin only)
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be either confirmed or cancelled'
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending bookings can be approved or rejected'
      });
    }

    // Update booking
    booking.status = status;
    booking.adminNotes = adminNotes;
    booking.approvedBy = req.user.id;
    booking.approvedAt = new Date();

    await booking.save();

    await booking.populate('userId', 'name email studentId');

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      data: booking
    });

  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking status'
    });
  }
};

// @desc    Test database connection and booking creation
// @route   GET /api/bookings/debug/test-db
// @access  Private
const testDatabaseConnection = async (req, res) => {
  try {
    console.log('=== DATABASE TEST ===');
    console.log('User:', req.user);
    
    // Test if we can query the bookings collection
    const bookingCount = await Booking.countDocuments();
    console.log('Current booking count:', bookingCount);
    
    // Test if we can create a simple document (without saving)
    const testBooking = new Booking({
      userId: req.user.id,
      roomType: 'double',
      roomNumber: 'TEST-001',
      hostelType: 'boys',
      checkInDate: new Date(),
      checkOutDate: new Date(Date.now() + 86400000), // tomorrow
      duration: 1
    });
    
    console.log('Test booking before validation:', testBooking.toObject());
    
    // Validate without saving
    const validationError = testBooking.validateSync();
    if (validationError) {
      console.log('❌ Validation error:', validationError.errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationError.errors
      });
    }
    
    console.log('✅ Validation passed');
    
    res.status(200).json({
      success: true,
      message: 'Database connection test successful',
      data: {
        bookingCount,
        canCreateBooking: true,
        modelFields: Object.keys(Booking.schema.paths),
        testBooking: testBooking.toObject()
      }
    });
    
  } catch (error) {
    console.error('❌ Database test error:', error);
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message,
      stack: error.stack
    });
  }
};

module.exports = {
  getAvailability,
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  testDatabaseConnection
};