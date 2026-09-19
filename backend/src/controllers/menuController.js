const MenuItem = require('../models/MenuItem');

exports.getMenuItems = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.name) {
      filter.name = {
        $regex: req.query.name,
        $options: "i"
      };
    }

    const limit = Number(req.query.limit) || 10;

    const items = await MenuItem
      .find(filter)
      .limit(limit);

    return res.json({
      success: true,
      data: items
    });

  } catch (err) {
    next(err);
  }
};
exports.getMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        return res.json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
};

exports.createMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.create(req.body);
        return res.status(201).json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
};

exports.updateMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        return res.json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
};

exports.deleteMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        return res.json({ success: true, message: 'Item deleted successfully' });
    } catch (err) {
        next(err);
    }
};

// PUT: /api/menu/:id/stock (Admin Only)
exports.updateStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { stock, available } = req.body;

        const menuItem = await MenuItem.findById(id);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }

        // تعديل الـ stock إذا تم تمريره
        if (typeof stock === 'number') {
            menuItem.stock = stock;
        }

        // تعديل حالة الـ available يدويًا إذا تم تمريرها، وإلا يحددها بناءً على الـ stock
        if (typeof available === 'boolean') {
            menuItem.available = available;
        } else if (typeof stock === 'number') {
            menuItem.available = stock > 0;
        }

        await menuItem.save();

        return res.status(200).json({
            success: true,
            message: 'Item inventory updated successfully',
            data: menuItem
        });
    } catch (error) {
        next(error);
    }
};

// GET: /api/menu/popular
exports.getPopularItems = async (req, res, next) => {
    try {
        // جلب 3 عناصر من فئة Desserts أو 3 عناصر متوفرة
        const popularItems = await MenuItem.find({ available: true, category: 'Desserts' })
            .limit(3);

        // لو مفيش كيكات/حلا كافية، بنجيب أي 3 عناصر متوفرة
        if (popularItems.length < 3) {
            const fallbackItems = await MenuItem.find({ available: true }).limit(3);
            return res.status(200).json({ success: true, data: fallbackItems });
        }

        return res.status(200).json({ success: true, data: popularItems });
    } catch (error) {
        next(error);
    }
};

// @desc    Get recommended menu items
// @route   GET /api/menu/recommended
// @access  Public
exports.getRecommendedItems = async (req, res, next) => {
    try {
        // جلب 8 عناصر عشوائياً باستخدام Aggregation Pipeline
        const recommendedItems = await MenuItem.aggregate([
            { $match: { available: true } }, // تصفية العناصر المتاحة فقط
            { $sample: { size: 8 } }          // اختيار 8 عناصر بشكل عشوائي
        ]);

        return res.json({
            success: true,
            count: recommendedItems.length,
            data: recommendedItems
        });
    } catch (err) {
        next(err);
    }
};