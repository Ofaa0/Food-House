const express = require('express');
const router = express.Router();
const {
  checkout,
  getMyOrders,
  getOrderById,
  getAllOrdersAdmin,
  updateOrderStatusAdmin
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// جميع المسارات التالية تتطلب تسجيل دخول (Authentication)
router.use(protect);

// 1. User Routes (Static paths first)
router.post('/checkout', checkout);
router.get('/my-orders', getMyOrders); // يفضّل استخدام /my-orders أو التخلي عنها كـ '/' حسب اختيارك
router.get('/', getMyOrders);

// 2. Admin Routes (Static paths first)
router.get('/admin/all', adminOnly, getAllOrdersAdmin);
router.put('/admin/:id/status', adminOnly, updateOrderStatusAdmin);

// 3. Dynamic Routes (Dynamic :id should always be last)
router.get('/:id', getOrderById);

module.exports = router;