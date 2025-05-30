const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roomType: {
    type: String,
    required: true,
    enum: ['single', 'double', 'fourth', 'sixth'], // Updated to match controller
  },
  roomNumber: {
    type: String,
    required: true,
  },
  hostelType: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  specialRequests: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], // Updated to match controller
  },
  adminNotes: {
    type: String,
    default: '',
  },
  cancellationReason: {
    type: String,
    default: '',
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  approvedAt: {
    type: Date,
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cancelledAt: {
    type: Date,
  },
}, {
  timestamps: true, // This adds createdAt and updatedAt automatically
});

// Static method to check availability
bookingSchema.statics.checkAvailability = async function(roomType, hostelType, checkInDate, checkOutDate) {
  try {
    // Get total capacity for room type (you can adjust these numbers)
    const roomCapacities = {
      'single': 10,
      'double': 15,
      'fourth': 20,
      'sixth': 25
    };

    const totalCapacity = roomCapacities[roomType] || 10;

    // Find overlapping bookings
    const overlappingBookings = await this.find({
      roomType,
      hostelType,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate }
        }
      ]
    });

    const bookedRooms = overlappingBookings.length;
    const availableRooms = totalCapacity - bookedRooms;

    return {
      available: availableRooms > 0,
      availableRooms: Math.max(0, availableRooms),
      totalCapacity,
      bookedRooms
    };
  } catch (error) {
    console.error('Check availability error:', error);
    throw error;
  }
};

module.exports = mongoose.model('Booking', bookingSchema);