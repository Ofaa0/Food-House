const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || process.env.DATABASE_URL)
    .then(() => console.log('MongoDB Connected for Food Blogs Seeding...'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

// عناوين ومواضيع متعلقة بالأكل والمطاعم
const foodTopics = [
    { title: 'The Secret Behind Our Signature Wood-Fired Pizza', tag: 'Pizza' },
    { title: '10 Reasons Why Fresh Ingredients Make All the Difference', tag: 'Fresh Food' },
    { title: 'The Ultimate Guide to Pairing Burgers with Homemade Sauces', tag: 'Burgers' },
    { title: 'Behind the Scenes: A Day in Our Chef’s Kitchen', tag: 'Chef Stories' },
    { title: 'Top 5 Healthy Mediterranean Dishes You Must Try', tag: 'Healthy' },
    { title: 'How to Master the Art of Cooking Pasta Al Dente', tag: 'Pasta' },
    { title: 'Exploring the Rich Flavors of Authentic Spices', tag: 'Culinary' },
    { title: 'The Rise of Gourmet Street Food in Modern Dining', tag: 'Trends' },
    { title: 'Why Our Handcrafted Desserts Are a Customer Favorite', tag: 'Desserts' }
];

const foodImages = [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445'
];

const generateFoodBlogs = (authorId) => {
    const blogs = [];

    for (let i = 1; i <= 25; i++) {
        const topic = foodTopics[i % foodTopics.length];
        const title = `${topic.title} - Part ${i}`;

        blogs.push({
            title,
            content: `Welcome to Food House's culinary blog! In this article, we dive deep into the mouth-watering world of ${topic.tag.toLowerCase()}. Great food starts with passion, locally sourced produce, and time-honored techniques. Join us as we explore the ingredients, recipes, and secret methods that elevate everyday meals into unforgettable dining experiences.`,
            excerpt: `Discover the passion and secrets behind our delicious ${topic.tag.toLowerCase()} recipes at Food House.`,
            coverImage: `${foodImages[i % foodImages.length]}?auto=format&fit=crop&w=800&q=80`,
            author: authorId,
            tags: [topic.tag, 'Foodie', 'Restaurant', 'Recipes'],
            isPublished: true,
            views: Math.floor(Math.random() * 800) + 50
        });
    }

    return blogs;
};

const seedBlogs = async () => {
    try {
        let author = await User.findOne({ role: 'admin' });
        if (!author) {
            author = await User.findOne();
        }

        if (!author) {
            console.error('❌ Error: No user found in database to assign as author.');
            process.exit(1);
        }

        await Blog.deleteMany();
        console.log('🗑️  Old blogs cleared...');

        const blogsData = generateFoodBlogs(author._id);

        for (const blogData of blogsData) {
            await Blog.create(blogData);
        }

        console.log('✅ Successfully seeded 25 Food House blogs!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedBlogs();