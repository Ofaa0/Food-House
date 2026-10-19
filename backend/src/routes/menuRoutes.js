// src/routes/menuRoutes.js
const express = require('express');
const router = express.Router();

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

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public Routes
router.get('/recommended', getRecommendedItems);
router.get('/popular', getPopularItems);
router.get('/', getMenuItems); // السطر 25
router.get('/:id', getMenuItem);

// Admin Routes
router.post('/', protect, adminOnly, createMenuItem);
router.put('/:id', protect, adminOnly, updateMenuItem);
router.delete('/:id', protect, adminOnly, deleteMenuItem);
router.put('/:id/stock', protect, adminOnly, updateStock);

module.exports = router;