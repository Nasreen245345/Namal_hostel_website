const express = require('express');
const router = express.Router();
const lostFoundController = require('../controllers/lostFoundController');
const { auth } = require('../middleware/auth');
// const upload = require('../middleware/upload'); // Uncomment if you have file upload middleware

// Public routes
// Get all lost and found items (with optional filters)
router.get('/', lostFoundController.getAllItems);

// Get statistics
router.get('/stats', lostFoundController.getStats);

// Get items by category
router.get('/category/:category', lostFoundController.getItemsByCategory);

// Get a specific lost or found item by ID
router.get('/:id', lostFoundController.getItemById);

// Protected routes (require authentication)
// Create a new lost or found item report
router.post('/', auth, lostFoundController.createItem);

// Get current user's items
router.get('/user/my-items', auth, lostFoundController.getMyItems);

// Update a lost or found item (only creator or admin)
router.put('/:id', auth, lostFoundController.updateItem);

// Update item status (resolve/activate)
router.put('/:id/status', auth, lostFoundController.updateItemStatus);

// Delete a lost or found item (only creator or admin)
router.delete('/:id', auth, lostFoundController.deleteItem);

module.exports = router;