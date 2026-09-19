const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true
        },
        content: {
            type: String,
            required: [true, 'Blog content is required']
        },
        excerpt: {
            type: String,
            trim: true
        },
        coverImage: {
            type: String,
            default: ''
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tags: [{
            type: String,
            trim: true
        }],
        isPublished: {
            type: Boolean,
            default: true
        },
        views: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// توليد Slug تلقائي من العنوان قبل الحفظ
blogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);