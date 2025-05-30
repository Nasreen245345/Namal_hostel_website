const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  getComplaintsByStudent,
  updateComplaintStatus,
  deleteComplaint,
  getComplaintStats
} = require('../controllers/complaintController');

// Import validation middleware
const {
  validateComplaint,
  validateComplaintUpdate,
  validateObjectId,
  validateQueryParams
} = require('../middleware/validate');

// Public routes
router.post('/', validateComplaint, createComplaint);

// Protected routes (add auth middleware as needed)
router.get('/', validateQueryParams, getAllComplaints);
router.get('/stats', getComplaintStats);
router.get('/:id', validateObjectId, getComplaintById);
router.get('/student/:studentId', validateQueryParams, getComplaintsByStudent);
router.put('/:id/status', validateObjectId, validateComplaintUpdate, updateComplaintStatus);
router.delete('/:id', validateObjectId, deleteComplaint);

module.exports = router;