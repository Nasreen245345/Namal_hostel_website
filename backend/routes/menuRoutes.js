// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware'); // ✅ Fixed import

// Menu controller functions (you'll need to create these)
const {
  getAllMenus,
  getWeeklyMenu,
  getDailyMenu,
  getDailySpecials,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuById
} = require('../controllers/menuController'); // Adjust path as needed

// ✅ PUBLIC ROUTES (no authentication required)
// Get weekly menu
router.get('/weekly', getWeeklyMenu);

// Get daily menu
router.get('/daily', getDailyMenu);

// Get daily specials
router.get('/specials', getDailySpecials);

// ✅ PROTECTED ROUTES (authentication required)
// Apply protection middleware to routes below
router.use(protect);

// Get all menus (admin only)
router.get('/', restrictTo('admin'), getAllMenus);

// Get single menu by ID (admin only)
router.get('/:id', restrictTo('admin'), getMenuById);

// Create new menu (admin only)
router.post('/', restrictTo('admin'), createMenu);

// Update menu (admin only)
router.put('/:id', restrictTo('admin'), updateMenu);

// Delete menu (admin only)
router.delete('/:id', restrictTo('admin'), deleteMenu);

module.exports = router;