const express = require('express');
const router = express.Router();

// Sample route: GET /api/healthcheck
router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router; // ✅ Make sure you export the router!
