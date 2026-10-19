const express = require('express');
const router = express.Router();
const {
  checkout,
  getMyOrders,
  getOrderById,
  getAllOrdersAdmin,
  getRecentOrdersAdmin,
  getAdminStats,
  updateOrderStatusAdmin
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// جميع المسارات التالية تتطلب تسجيل دخول
router.use(protect);

// 1. User Routes
router.post('/checkout', checkout);
router.get('/my-orders', getMyOrders);
router.get('/', getMyOrders);

// 2. Admin Routes (تم وضعها قبل الـ Dynamic Route لمنع التداخل)
router.get('/admin/stats', adminOnly, getAdminStats);
router.get('/admin/orders/recent', adminOnly, getRecentOrdersAdmin);
router.get('/admin/all', adminOnly, getAllOrdersAdmin);
router.put('/admin/:id/status', adminOnly, updateOrderStatusAdmin);

// 3. Dynamic Routes (تكون في النهاية دائماً)
router.get('/:id', getOrderById);

module.exports = router;