const Banner = require('../models/Banner');

// داتا وهمية للبدء فوراً (Mock Data)
const dummyBanners = [
    {
        title: "Nibh in dolor bibendum.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, est felis, sagittis viverra nulla mattis scelerisque. Eget cras integer.",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Delicious Smoked Burger.",
        description: "Juicy beef patty topped with melted cheddar cheese, caramelized onions, and our secret house sauce served on a toasted brioche bun.",
        imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Crispy Golden Fries & Drinks.",
        description: "Complete your meal with our crispy seasoned hand-cut fries and fresh refreshing cold beverages made daily.",
        imageUrl: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZXN8ZW58MHx8MHx8fDA%3D"
    },
    {
        title: "Freshly Baked Desserts.",
        description: "Indulge in our selection of freshly baked desserts, from rich chocolate brownies to creamy cheesecakes, made with love and the finest ingredients.",
        imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Healthy Salads & Wraps.",
        description: "Enjoy our crisp and refreshing salads and wraps, packed with fresh vegetables, lean proteins, and flavorful dressings for a guilt-free meal.",
        imageUrl: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8fDA%3D"
    },
    {
        title: "Gourmet Pizza Selection.",
        description: "Savor our gourmet pizza selection, featuring hand-tossed crusts, premium toppings, and a variety of cheeses baked to perfection.",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D"
    }
];

// GET: /api/banners
exports.getBanners = async (req, res, next) => {
    try {
        let banners = await Banner.find({ isActive: true });

        // لو الداتابيز فاضية، بيستبدلها بالداتا الوهمية فوراً
        if (banners.length === 0) {
            banners = dummyBanners;
        }

        return res.status(200).json({
            success: true,
            count: banners.length,
            data: banners
        });
    } catch (error) {
        next(error);
    }
};