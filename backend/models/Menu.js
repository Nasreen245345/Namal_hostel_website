const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  day: {
    type: String,
    required: [true, 'Day is required'],
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    lowercase: true
  },
  mealType: {
    type: String,
    required: [true, 'Meal type is required'],
    enum: ['breakfast', 'lunch', 'dinner'],
    lowercase: true
  },
  items: [{
    type: String,
    required: [true, 'Menu item is required'],
    trim: true
  }],
  weekNumber: {
    type: Number,
    default: 1,
    min: 1,
    max: 52
  },
  isActive: {
    type: Boolean,
    default: true
  },
  specialItems: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    isVegetarian: {
      type: Boolean,
      default: false
    },
    image: {
      type: String
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create compound index for day and mealType to ensure uniqueness per week
menuSchema.index({ day: 1, mealType: 1, weekNumber: 1 }, { unique: true });

// Virtual for formatted day name
menuSchema.virtual('formattedDay').get(function() {
  return this.day.charAt(0).toUpperCase() + this.day.slice(1);
});

// Static method to get full weekly menu
menuSchema.statics.getWeeklyMenu = async function(weekNumber = 1) {
  const menu = await this.find({ 
    weekNumber, 
    isActive: true 
  }).sort({ day: 1 });
  
  // Group by day
  const weeklyMenu = {};
  menu.forEach(item => {
    if (!weeklyMenu[item.day]) {
      weeklyMenu[item.day] = {};
    }
    weeklyMenu[item.day][item.mealType] = item.items;
  });
  
  return weeklyMenu;
};

// Instance method to add special item
menuSchema.methods.addSpecialItem = function(specialItem) {
  this.specialItems.push(specialItem);
  return this.save();
};

module.exports = mongoose.model('Menu', menuSchema);