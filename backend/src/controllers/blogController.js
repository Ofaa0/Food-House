const Blog = require('../models/Blog');

// @desc    Get all published blogs (with pagination & search)
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search;

        const query = { isPublished: true };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        const blogs = await Blog.find(query)
            .populate('author', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments(query);

        return res.json({
            success: true,
            count: blogs.length,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            },
            data: blogs
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single blog by ID or Slug
// @route   GET /api/blogs/:idOrSlug
// @access  Public
exports.getBlogByIdOrSlug = async (req, res, next) => {
    try {
        const { idOrSlug } = req.params;
        const isObjectId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);

        const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };

        const blog = await Blog.findOne(query).populate('author', 'name email');

        if (!blog || (!blog.isPublished && req.user?.role !== 'admin')) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // زيادة عدد المشاهدات عند القراءة
        blog.views += 1;
        await blog.save();

        return res.json({ success: true, data: blog });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res, next) => {
    try {
        const { title, content, excerpt, coverImage, tags, isPublished } = req.body;

        const blog = await Blog.create({
            title,
            content,
            excerpt,
            coverImage,
            tags,
            isPublished,
            author: req.user.id
        });

        return res.status(201).json({ success: true, data: blog });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        return res.json({ success: true, data: blog });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        return res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (err) {
        next(err);
    }
};