// models/Counselor.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true
  },
  studentPhone: {
    type: String,
    required: true
  },
  studentIdNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  reasonForVisit: {
    type: String,
    required: true
  },
  preferredMode: {
    type: String,
    enum: ['in-person', 'virtual', 'phone'],
    default: 'in-person'
  },
  urgency: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  previousVisit: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const counselorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Counselor name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  bio: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    default: ''
  },
  specialization: {
    type: [String],
    default: []
  },
  availableSlots: [{
    type: String,
    required: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  appointments: [appointmentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
counselorSchema.index({ 'appointments.studentId': 1, 'appointments.date': 1 });
counselorSchema.index({ isActive: 1 });

// Virtual for appointment count
counselorSchema.virtual('appointmentCount').get(function() {
  return this.appointments.length;
});

// Pre-save middleware to update updatedAt
counselorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method to check slot availability
counselorSchema.methods.isSlotAvailable = function(date, timeSlot) {
  const appointmentDate = new Date(date);
  const existingAppointment = this.appointments.find(apt => {
    const aptDate = new Date(apt.date);
    return aptDate.toDateString() === appointmentDate.toDateString() && 
           apt.timeSlot === timeSlot && 
           apt.status !== 'cancelled' && 
           apt.status !== 'rejected';
  });
  return !existingAppointment;
};

// Static method to get available counselors
counselorSchema.statics.getAvailableCounselors = function() {
  return this.find({ isActive: true }).select('-appointments');
};

module.exports = mongoose.model('Counselor', counselorSchema);