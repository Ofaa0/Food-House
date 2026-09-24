const express = require('express');
const router = express.Router();
const { register, updateUserProfile, updatePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.post('/register', register);

// Protected route
router.put('/profile', protect, updateUserProfile);
router.put("/change-password", protect, updatePassword);

module.exports = router;