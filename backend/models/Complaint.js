const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintNumber: {
    type: String,
    unique: true,
    // Remove required validation - we'll generate it before saving
  },
  title: {
    type: String,
    required: [true, 'Complaint title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Complaint description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Complaint category is required'],
    enum: {
      values: ['maintenance', 'food', 'cleanliness', 'noise', 'security', 'wifi', 'other'],
      message: 'Category must be one of: maintenance, food, cleanliness, noise, security, wifi, other'
    }
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high', 'urgent'],
      message: 'Priority must be one of: low, medium, high, urgent'
    },
    default: 'medium'
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'resolved', 'rejected'],
      message: 'Status must be one of: pending, in-progress, resolved, rejected'
    },
    default: 'pending'
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  studentEmail: {
    type: String,
    required: [true, 'Student email is required'],
    trim: true,
    lowercase: true
  },
  roomNumber: {
    type: String,
    trim: true,
    maxlength: [10, 'Room number cannot exceed 10 characters']
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^[\d\-\+\(\)\s]+$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  adminResponse: {
    type: String,
    trim: true,
    maxlength: [500, 'Admin response cannot exceed 500 characters']
  },
  resolvedAt: {
    type: Date
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  expectedResolutionDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
complaintSchema.index({ studentId: 1, status: 1 });
complaintSchema.index({ category: 1, status: 1 });
complaintSchema.index({ createdAt: -1 });
complaintSchema.index({ complaintNumber: 1 }); // Explicit index for complaint number

// Static method to generate complaint number
complaintSchema.statics.generateComplaintNumber = async function() {
  try {
    // Get current year
    const currentYear = new Date().getFullYear();
    
    // Find the latest complaint for current year
    const latestComplaint = await this.findOne({
      complaintNumber: { $regex: `^CMP-${currentYear}-` }
    }).sort({ createdAt: -1 });

    let sequenceNumber = 1;
    
    if (latestComplaint && latestComplaint.complaintNumber) {
      // Extract sequence number from the latest complaint
      const match = latestComplaint.complaintNumber.match(/CMP-\d{4}-(\d{4})/);
      if (match) {
        sequenceNumber = parseInt(match[1]) + 1;
      }
    }

    // Generate new complaint number
    return `CMP-${currentYear}-${sequenceNumber.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error('Error generating complaint number:', error);
    // Fallback to timestamp-based number
    const timestamp = Date.now().toString().slice(-6);
    return `CMP-${new Date().getFullYear()}-${timestamp}`;
  }
};

// Export the model
module.exports = mongoose.model('Complaint', complaintSchema);