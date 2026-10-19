const MenuItem = require('../models/MenuItem');

// 1. جلب جميع عناصر المنيو
exports.getMenuItems = async (req, res, next) => {
  try {
    const items = await MenuItem.find();
    return res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

// 2. جلب عنصر واحد برقم الـ ID
exports.getMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// 3. جلب العناصر الأكثر شعبية (Popular Items)
exports.getPopularItems = async (req, res, next) => {
  try {
    // 1. محاولة جلب المنتجات المميزة كـ Popular
    let popularItems = await MenuItem.find({ isPopular: true }).limit(3);

    // 2. إذا لم يتم العثور على أي منتج، يتم جلب أحدث 6 منتجات كخيار احتياطي
    if (!popularItems || popularItems.length === 0) {
      popularItems = await MenuItem.find().sort({ createdAt: -1 }).limit(3);
    }

    return res.status(200).json({ success: true, data: popularItems });
  } catch (error) {
    next(error);
  }
};

// 4. جلب العناصر الموصى بها (Recommended Items)
exports.getRecommendedItems = async (req, res, next) => {
  try {
    const recommendedItems = await MenuItem.find({ isRecommended: true }).limit(6);
    return res.status(200).json({ success: true, data: recommendedItems });
  } catch (error) {
    next(error);
  }
};

// 5. إنشاء عنصر منيو جديد (Add New Product)
exports.createMenuItem = async (req, res, next) => {
  try {
    const { name, category, price, description, image, stock } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({ success: false, message: 'Name, category, and price are required' });
    }

    const menuItem = await MenuItem.create({
      name,
      category,
      price: Number(price),
      description: description || '',
      image: image || '',
      stock: stock !== undefined ? Number(stock) : 100
    });

    return res.status(201).json({ success: true, message: 'Product created successfully', data: menuItem });
  } catch (error) {
    next(error);
  }
};

// 6. تعديل عنصر منيو
exports.updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

// 7. حذف عنصر منيو
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// 8. تحديث مخزون المنتج (Update Stock)
exports.updateStock = async (req, res, next) => {
  try {
    const { stock } = req.body;
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true, runValidators: true }
    );
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};