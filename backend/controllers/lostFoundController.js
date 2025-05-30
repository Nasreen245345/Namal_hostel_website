const LostFoundItem = require('../models/LostFoundItem');

/**
 * Get all lost and found items
 * @route GET /api/lost-found
 * @access Public
 */
exports.getAllItems = async (req, res) => {
  try {
    const { type, status, category, search } = req.query; // Changed from itemType to type
    
    // Build filter object
    const filter = {};
    if (type) filter.type = type; // Changed from itemType to type
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    const items = await LostFoundItem.find(filter)
      .populate('reportedBy', 'name email') // Changed from 'user' to 'reportedBy'
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: items.length, 
      data: items 
    });
  } catch (err) {
    console.error('Get all lost/found items error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching items' 
    });
  }
};

/**
 * Get items reported by current user
 * @route GET /api/lost-found/my-items
 * @access Private
 */
exports.getMyItems = async (req, res) => {
  try {
    const items = await LostFoundItem.find({ reportedBy: req.user.id }) // Changed from 'user' to 'reportedBy'
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: items.length, 
      data: items 
    });
  } catch (err) {
    console.error('Get my lost/found items error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching your items' 
    });
  }
};

/**
 * Get item by ID
 * @route GET /api/lost-found/:id
 * @access Public
 */
exports.getItemById = async (req, res) => {
  try {
    const item = await LostFoundItem.findById(req.params.id)
      .populate('reportedBy', 'name email') // Changed from 'user' to 'reportedBy'
      .populate('resolutionDetails.resolvedBy', 'name email');
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: item 
    });
  } catch (err) {
    console.error('Get item by ID error:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching item' 
    });
  }
};

/**
 * Create new lost/found item
 * @route POST /api/lost-found
 * @access Private
 */
exports.createItem = async (req, res) => {
  try {
    const { 
      type,        // Keep as 'type' to match model
      title,
      description,
      category,
      date,
      location,
      contact,     // Keep as 'contact' to match model
      images
    } = req.body;

    // Validate required fields
    if (!type || !title || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: type, title, description, category, location'
      });
    }

    if (!['lost', 'found'].includes(type)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Type must be either "lost" or "found"' 
      });
    }

    // Create new item with correct field names for the model
    const newItem = new LostFoundItem({
      reportedBy: req.user.id,  // Changed from 'user' to 'reportedBy'
      type: type,               // Use 'type' as per model
      title: title.trim(),
      description: description.trim(),
      category,
      date: date ? new Date(date) : new Date(),
      location,
      contact: {                // Use 'contact' as per model
        name: contact?.name || req.user.name,
        email: contact?.email || req.user.email,
        phone: contact?.phone || ''
      },
      images: images || [],
      status: 'open'           // Changed from 'active' to 'open' as per model
    });

    const item = await newItem.save();
    
    // Populate user info before sending response
    const populatedItem = await LostFoundItem.findById(item._id)
      .populate('reportedBy', 'name email'); // Changed from 'user' to 'reportedBy'
    
    res.status(201).json({ 
      success: true, 
      data: populatedItem,
      message: `${type === 'lost' ? 'Lost' : 'Found'} item reported successfully`
    });
  } catch (err) {
    console.error('Create lost/found item error:', err.message);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating item' 
    });
  }
};

/**
 * Update lost/found item
 * @route PUT /api/lost-found/:id
 * @access Private
 */
exports.updateItem = async (req, res) => {
  try {
    let item = await LostFoundItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    // Check if user owns the item or is admin
    if (item.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') { // Changed from 'user' to 'reportedBy'
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this item' 
      });
    }

    const { 
      title,
      description,
      category,
      date,
      location,
      contact,
      images,
      status
    } = req.body;

    // Update fields
    const updateFields = {
      updatedAt: new Date()
    };
    
    if (title) updateFields.title = title.trim();
    if (description) updateFields.description = description.trim();
    if (category) updateFields.category = category;
    if (date) updateFields.date = new Date(date);
    if (location) updateFields.location = location;
    if (images) updateFields.images = images;
    if (status && ['open', 'claimed', 'resolved', 'expired'].includes(status)) { // Updated status values
      updateFields.status = status;
    }
    if (contact) {
      updateFields.contact = { // Changed from 'contactInfo' to 'contact'
        name: contact.name || item.contact.name,
        email: contact.email || item.contact.email,
        phone: contact.phone || item.contact.phone
      };
    }
    
    item = await LostFoundItem.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).populate('reportedBy', 'name email'); // Changed from 'user' to 'reportedBy'
    
    res.json({ 
      success: true, 
      data: item,
      message: 'Item updated successfully'
    });
  } catch (err) {
    console.error('Update lost/found item error:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating item' 
    });
  }
};

/**
 * Delete lost/found item
 * @route DELETE /api/lost-found/:id
 * @access Private
 */
exports.deleteItem = async (req, res) => {
  try {
    const item = await LostFoundItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    // Check if user owns the item or is admin
    if (item.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') { // Changed from 'user' to 'reportedBy'
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this item' 
      });
    }
    
    await LostFoundItem.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Item deleted successfully' 
    });
  } catch (err) {
    console.error('Delete lost/found item error:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting item' 
    });
  }
};

/**
 * Update item status (resolve/activate)
 * @route PUT /api/lost-found/:id/status
 * @access Private
 */
exports.updateItemStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    if (!status || !['open', 'claimed', 'resolved', 'expired'].includes(status)) { // Updated status values
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (open, claimed, resolved, expired)'
      });
    }
    
    const item = await LostFoundItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    // Update status
    item.status = status;
    item.updatedAt = new Date();
    
    // If resolving the item, add resolution details
    if (status === 'resolved') {
      item.resolutionDetails = {
        resolved: true,
        resolvedBy: req.user.id,
        resolvedAt: new Date(),
        notes: notes || ''
      };
    }
    
    await item.save();
    
    const populatedItem = await LostFoundItem.findById(item._id)
      .populate('reportedBy', 'name email') // Changed from 'user' to 'reportedBy'
      .populate('resolutionDetails.resolvedBy', 'name email');
    
    res.json({ 
      success: true, 
      data: populatedItem,
      message: `Item status updated to ${status}`
    });
  } catch (err) {
    console.error('Update item status error:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating status' 
    });
  }
};

/**
 * Get items by category
 * @route GET /api/lost-found/category/:category
 * @access Public
 */
exports.getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { type } = req.query; // Changed from itemType to type
    
    const filter = { category };
    if (type) filter.type = type; // Changed from itemType to type
    
    const items = await LostFoundItem.find(filter)
      .populate('reportedBy', 'name email') // Changed from 'user' to 'reportedBy'
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: items.length, 
      data: items 
    });
  } catch (err) {
    console.error('Get items by category error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching items by category' 
    });
  }
};

/**
 * Get lost/found statistics
 * @route GET /api/lost-found/stats
 * @access Public
 */
exports.getStats = async (req, res) => {
  try {
    const totalItems = await LostFoundItem.countDocuments();
    const lostItems = await LostFoundItem.countDocuments({ type: 'lost' }); // Changed from itemType to type
    const foundItems = await LostFoundItem.countDocuments({ type: 'found' }); // Changed from itemType to type
    const resolvedItems = await LostFoundItem.countDocuments({ status: 'resolved' });
    const openItems = await LostFoundItem.countDocuments({ status: 'open' }); // Changed from active to open
    
    res.json({
      success: true,
      data: {
        total: totalItems,
        lost: lostItems,
        found: foundItems,
        resolved: resolvedItems,
        open: openItems, // Changed from active to open
        resolutionRate: totalItems > 0 ? ((resolvedItems / totalItems) * 100).toFixed(2) : 0
      }
    });
  } catch (err) {
    console.error('Get lost/found stats error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching statistics' 
    });
  }
};