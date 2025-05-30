// controllers/menuController.js
const Menu = require('../models/Menu'); // You'll need to create this model

// @desc    Get all menus (admin only)
// @route   GET /api/menu
// @access  Private/Admin
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: menus.length,
      data: menus
    });
  } catch (error) {
    console.error('Get all menus error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching menus'
    });
  }
};

// @desc    Get weekly menu (public)
// @route   GET /api/menu/weekly
// @access  Public
const getWeeklyMenu = async (req, res) => {
  try {
    // Get current week's menu
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    const weeklyMenu = await Menu.find({
      date: {
        $gte: startOfWeek,
        $lte: endOfWeek
      },
      isActive: true
    }).sort({ date: 1 });
    
    res.status(200).json({
      success: true,
      data: weeklyMenu,
      weekRange: {
        start: startOfWeek,
        end: endOfWeek
      }
    });
  } catch (error) {
    console.error('Get weekly menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching weekly menu'
    });
  }
};

// @desc    Get daily menu (public)
// @route   GET /api/menu/daily
// @access  Public
const getDailyMenu = async (req, res) => {
  try {
    const { date } = req.query;
    
    // Use provided date or today's date
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const dailyMenu = await Menu.findOne({
      date: {
        $gte: targetDate,
        $lt: nextDay
      },
      isActive: true
    });
    
    if (!dailyMenu) {
      return res.status(404).json({
        success: false,
        message: 'No menu found for the specified date'
      });
    }
    
    res.status(200).json({
      success: true,
      data: dailyMenu
    });
  } catch (error) {
    console.error('Get daily menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching daily menu'
    });
  }
};

// @desc    Get daily specials (public)
// @route   GET /api/menu/specials
// @access  Public
const getDailySpecials = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const specials = await Menu.findOne({
      date: {
        $gte: today,
        $lt: tomorrow
      },
      isActive: true,
      'items.isSpecial': true
    }).select('items.$ specialOffers');
    
    res.status(200).json({
      success: true,
      data: specials || { items: [], specialOffers: [] }
    });
  } catch (error) {
    console.error('Get daily specials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching daily specials'
    });
  }
};

// @desc    Create new menu (admin only)
// @route   POST /api/menu
// @access  Private/Admin
const createMenu = async (req, res) => {
  try {
    const menuData = {
      ...req.body,
      createdBy: req.user._id
    };
    
    const menu = await Menu.create(menuData);
    
    res.status(201).json({
      success: true,
      message: 'Menu created successfully',
      data: menu
    });
  } catch (error) {
    console.error('Create menu error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating menu'
    });
  }
};

// @desc    Get single menu by ID (admin only)
// @route   GET /api/menu/:id
// @access  Private/Admin
const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: menu
    });
  } catch (error) {
    console.error('Get menu by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching menu'
    });
  }
};

// @desc    Update menu (admin only)
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found'
      });
    }
    
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Menu updated successfully',
      data: updatedMenu
    });
  } catch (error) {
    console.error('Update menu error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating menu'
    });
  }
};

// @desc    Delete menu (admin only)
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found'
      });
    }
    
    await Menu.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Menu deleted successfully'
    });
  } catch (error) {
    console.error('Delete menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting menu'
    });
  }
};

module.exports = {
  getAllMenus,
  getWeeklyMenu,
  getDailyMenu,
  getDailySpecials,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuById
};