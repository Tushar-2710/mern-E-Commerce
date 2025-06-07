const express = require('express');
const { getDashboardStats, getRecentActivity } = require('../../controller/admin/dashboard')
const router = express.Router();

// Dashboard stats
router.get('/admin/stats', getDashboardStats);

// Recent Activity
router.get('/admin/recent-activity', getRecentActivity);

module.exports = router;
