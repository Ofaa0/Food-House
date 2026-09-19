const express = require('express');
const router = express.Router();

// 1. استيراد جميع الدوال من الكنترولر
const {
    getMenuItems,
    getMenuItem,
    getPopularItems,
    getRecommendedItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateStock
} = require('../controllers/menuController');

// 2. استيراد الميدلوير
const { protect, adminOnly } = require('../middleware/authMiddleware');

// ------------------- Public Routes -------------------

// ⚠️ هام جداً: المسارات الثابتة يجب أن تُعرّف قبل المسارات التي تحتوي على :id
router.get('/recommended', getRecommendedItems);
router.get('/popular', getPopularItems);

router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

// ------------------- Admin Protected Routes -------------------

router.post('/', protect, adminOnly, createMenuItem);
router.put('/:id', protect, adminOnly, updateMenuItem);
router.delete('/:id', protect, adminOnly, deleteMenuItem);
router.put('/:id/stock', protect, adminOnly, updateStock);

module.exports = router;