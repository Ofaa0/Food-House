const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('../models/MenuItem');

dotenv.config();

// مجموعة صور متنوّعة وشغالة بشكل مباشر لضمان عدم ظهور أخطاء Load
const imagePool = {
    Burgers: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
        'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500',
        'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500'
    ],
    Pizza: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
        'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500',
        'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500',
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500'
    ],
    Sides: [
        'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
        'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500',
        'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500'
    ],
    Drinks: [
        'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=500',
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500',
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500'
    ],
    Desserts: [
        'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
        'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500'
    ]
};

const generateMenuItems = () => {
    const items = [];

    const categoryData = {
        Pizza: {
            names: ['Margherita', 'Pepperoni Supreme', 'BBQ Chicken', 'Four Cheese', 'Truffle Mushroom', 'Seafood Delight', 'Veggie Paradise', 'Hawaiian Pizza'],
            ingredients: ['fresh mozzarella and basil', 'crispy pepperoni and tomato sauce', 'grilled chicken and smoky BBQ sauce', 'blend of cheddar, mozzarella, blue cheese, and parmesan', 'wild mushrooms and truffle oil']
        },
        Burgers: {
            names: ['Classic Beef Burger', 'Double Smash Burger', 'Crispy Chicken Zinger', 'Mushroom Swiss Burger', 'BBQ Bacon Burger', 'Truffle Egg Burger'],
            ingredients: ['100% Angus beef patty with cheddar cheese', 'double beef patties with melted cheddar', 'crispy fried chicken fillet with spicy mayo', 'juicy beef with sauted mushrooms and Swiss cheese']
        },
        Sides: {
            names: ['French Fries', 'Onion Rings', 'Mozzarella Sticks', 'Garlic Bread', 'Loaded Nachos', 'Potato Wedges'],
            ingredients: ['crispy golden potatoes with sea salt', 'battered onion rings with dip sauce', 'melted mozzarella cheese wrapped in crispy breadcrumbs', 'toasted baguette topped with garlic butter and herbs']
        },
        Desserts: {
            names: ['Chocolate Lava Cake', 'New York Cheesecake', 'Red Velvet Slice', 'Tiramisu Cup', 'Pistachio Kunafa', 'Molten Salted Caramel'],
            ingredients: ['warm molten chocolate center served with vanilla ice cream', 'rich and creamy cheesecake with berry compote', 'layers of rich red velvet sponge and cream cheese', 'espresso-soaked ladyfingers with mascarpone']
        },
        Drinks: {
            names: ['Fresh Orange Juice', 'Iced Spanish Latte', 'Classic Mojito', 'Mango Smoothie', 'Chocolate Milkshake'],
            ingredients: ['100% fresh squeezed oranges', 'espresso with condensed milk over ice', 'fresh mint, lime, and sparkling soda', 'blended ripe mangoes with honey']
        }
    };

    const categories = Object.keys(categoryData);

    for (let i = 1; i <= 100; i++) {
        const category = categories[i % categories.length];
        const data = categoryData[category];
        const categoryImages = imagePool[category] || imagePool['Pizza'];

        const baseName = data.names[i % data.names.length];
        const ingredient = data.ingredients[i % data.ingredients.length];
        
        // التدوير بين الصور المتاحة في القائمة لضمان عدم التكرار المباشر لجميع العناصر
        const img = categoryImages[i % categoryImages.length];

        items.push({
            name: baseName,
            description: `Delicious ${baseName.toLowerCase()} crafted with ${ingredient}.`,
            price: parseFloat((Math.random() * (25 - 5) + 5).toFixed(2)),
            category: category,
            image: img,
            stock: Math.floor(Math.random() * 50) + 10,
            available: true
        });
    }

    return items;
};

// رفع البيانات إلى قاعدة البيانات
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.DATABASE_URL);
        console.log('Connected to MongoDB...');

        await MenuItem.deleteMany({});
        console.log('Cleared existing menu items.');

        const items = generateMenuItems();
        await MenuItem.insertMany(items);

        console.log('Successfully added 100 Menu Items to Database!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();