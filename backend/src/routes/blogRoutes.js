const express = require('express');
const router = express.Router();

const {
    getBlogs,
    getBlogByIdOrSlug,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// ------------------- Public Routes -------------------
router.get('/', getBlogs);
router.get('/:idOrSlug', getBlogByIdOrSlug);

// ------------------- Admin Protected Routes -------------------
router.post('/', protect, adminOnly, createBlog);
router.put('/:id', protect, adminOnly, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

module.exports = router;