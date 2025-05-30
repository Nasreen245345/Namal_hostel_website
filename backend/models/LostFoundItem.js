// models/LostFoundItem.js - Fixed Lost and Found item model schema

const mongoose = require('mongoose');

const LostFoundItemSchema = new mongoose.Schema({
  // Changed from 'user' to 'reportedBy' to match controller
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Changed from 'itemType' to 'type' to match controller
  type: {
    type: String,
    enum: ['lost', 'found'], // Lowercase to match controller
    required: [true, 'Please specify if the item is lost or found']
  },
  
  title: {
    type: String,
    required: [true, 'Please add an item title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Please add an item description'],
    trim: true
  },
  
  category: {
    type: String,
    enum: [
      'electronics', 
      'clothing', 
      'accessories', 
      'documents', 
      'keys', 
      'stationery', 
      'other'
    ],
    required: [true, 'Please specify item category']
  },
  
  location: {
    type: String,
    required: [true, 'Please specify where the item was lost/found']
  },
  
  date: {
    type: Date,
    required: [true, 'Please specify the date when the item was lost/found'],
    default: Date.now
  },
  
  images: [
    {
      type: String // URL to the uploaded image
    }
  ],
  
  // Updated status enum to match controller expectations
  status: {
    type: String,
    enum: ['open', 'claimed', 'resolved', 'expired'], // Updated to match controller
    default: 'open' // Changed from 'active' to 'open'
  },
  
  // Added contact field that controller expects
  contact: {
    name: String,
    email: String,
    phone: String
  },
  
  // Added fields that controller uses for claiming functionality
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  claimedAt: {
    type: Date
  },
  
  claimDetails: {
    type: String
  },
  
  // Keep existing resolution details for backward compatibility
  resolutionDetails: {
    resolved: {
      type: Boolean,
      default: false
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date,
    notes: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  expiresAt: {
    type: Date,
    default: function() {
      // Set expiration to 30 days from creation by default
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 30);
      return expDate;
    }
  }
});

// Update the updatedAt field before saving
LostFoundItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add index for better query performance
LostFoundItemSchema.index({ type: 1, status: 1 });
LostFoundItemSchema.index({ reportedBy: 1 });
LostFoundItemSchema.index({ createdAt: -1 });

module.exports = mongoose.model('LostFoundItem', LostFoundItemSchema);