// const Order = require('../models/Order');
// const Cart = require('../models/Cart');
// const MenuItem = require('../models/MenuItem');

// // 1. إنشاء طلب جديد (Checkout & Confirm Pay)
// exports.checkout = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const { 
//       deliveryAddress, 
//       paymentMethod = 'Credit Card', 
//       cardDetails, 
//       shippingFee = 0,
//       discountAmount = 0 
//     } = req.body;

//     // جلب سلة المستخدم
//     const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');
//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ success: false, message: 'Cart is empty' });
//     }

//     // التحقق من توفر الكميات والمخزون
//     for (const item of cart.items) {
//       const menuItem = item.menuItem;
//       if (!menuItem || !menuItem.available || menuItem.stock < item.quantity) {
//         return res.status(400).json({
//           success: false,
//           message: `Sorry, insufficient stock for: ${menuItem ? menuItem.name : 'Item'}`
//         });
//       }
//     }

//     // تجهيز عناصر الطلب
//     const orderItems = cart.items.map(item => ({
//       menuItem: item.menuItem._id,
//       quantity: item.quantity,
//       price: item.menuItem.price
//     }));

//     // حساب الإجمالي النهائي (إجمالي السلة + الشحن - الخصم)
//     const itemsTotal = cart.totalPrice || orderItems.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
//     const finalTotalAmount = Math.max(0, itemsTotal + Number(shippingFee) - Number(discountAmount));

//     // إنشاء الأوردر
//     const order = await Order.create({
//       user: userId,
//       items: orderItems,
//       totalAmount: finalTotalAmount,
//       shippingFee,
//       discountAmount,
//       deliveryAddress,
//       paymentMethod, // 'Credit Card' or 'Paypal'
//       paymentStatus: 'Paid', // أو 'Pending' بناءً على بوابة الدفع
//       cardDetails: paymentMethod === 'Credit Card' ? {
//         cardHolder: cardDetails?.cardHolder,
//         lastFourDigits: cardDetails?.cardNumber ? cardDetails.cardNumber.slice(-4) : ''
//       } : undefined
//     });

//     // خصم الكميات المشتراة من المخزون
//     for (const item of cart.items) {
//       await MenuItem.findByIdAndUpdate(item.menuItem._id, {
//         $inc: { stock: -item.quantity }
//       });
//     }

//     // تصفير السلة وإلغاء كود الخصم المطبق عليها
//     cart.items = [];
//     cart.totalPrice = 0;
//     cart.appliedCoupon = null; 
//     cart.discount = 0;
//     await cart.save();

//     return res.status(201).json({
//       success: true,
//       message: 'Order placed successfully',
//       data: order
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // 2. جلب كافة طلبات المستخدم الحالي
// exports.getMyOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.find({ user: req.user.id })
//       .populate('items.menuItem')
//       .sort({ createdAt: -1 });

//     return res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     next(error);
//   }
// };

// // 3. جلب تفاصيل طلب واحد برقم الـ ID (لشاشة Success Page أو Tracking)
// exports.getOrderById = async (req, res, next) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('items.menuItem');
    
//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     // تأكيد أن الطلب يخص المستخدم المسجل أو أن المستخدم أدمن
//     if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
//     }

//     return res.status(200).json({ success: true, data: order });
//   } catch (error) {
//     next(error);
//   }
// };

// // 4. جلب جميع الطلبات للوحة تحكم الأدمن
// exports.getAllOrdersAdmin = async (req, res, next) => {
//   try {
//     const orders = await Order.find()
//       .populate('user', 'name email')
//       .populate('items.menuItem')
//       .sort({ createdAt: -1 });

//     return res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     next(error);
//   }
// };

// // 5. تحديث حالة الطلب من قِبل الأدمن (Pending, Preparing, Out for Delivery, Delivered)
// exports.updateOrderStatusAdmin = async (req, res, next) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     return res.status(200).json({ success: true, data: order });
//   } catch (error) {
//     next(error);
//   }
// };


const Order = require('../models/Order');
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');

// ==========================================
// 1. إنشاء طلب جديد (Checkout & Confirm Pay)
// ==========================================
exports.checkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { 
      deliveryAddress, 
      paymentMethod = 'Credit Card', 
      cardDetails, 
      shippingFee = 0,
      discountAmount = 0 
    } = req.body;

    // جلب سلة المستخدم
    const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // التحقق من توفر الكميات والمخزون
    for (const item of cart.items) {
      const menuItem = item.menuItem;
      if (!menuItem || !menuItem.available || menuItem.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Sorry, insufficient stock for: ${menuItem ? menuItem.name : 'Item'}`
        });
      }
    }

    // تجهيز عناصر الطلب
    const orderItems = cart.items.map(item => ({
      menuItem: item.menuItem._id,
      quantity: item.quantity,
      price: item.menuItem.price
    }));

    // حساب الإجمالي النهائي (إجمالي السلة + الشحن - الخصم)
    const itemsTotal = cart.totalPrice || orderItems.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
    const finalTotalAmount = Math.max(0, itemsTotal + Number(shippingFee) - Number(discountAmount));

    // إنشاء الأوردر
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount: finalTotalAmount,
      shippingFee,
      discountAmount,
      deliveryAddress,
      paymentMethod, // 'Credit Card' or 'Paypal'
      paymentStatus: 'Paid', // أو 'Pending' بناءً على بوابة الدفع
      status: 'confirmed',
      cardDetails: paymentMethod === 'Credit Card' ? {
        cardHolder: cardDetails?.cardHolder,
        lastFourDigits: cardDetails?.cardNumber ? cardDetails.cardNumber.slice(-4) : ''
      } : undefined
    });

    // خصم الكميات المشتراة من المخزون
    for (const item of cart.items) {
      await MenuItem.findByIdAndUpdate(item.menuItem._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // تصفير السلة وإلغاء كود الخصم المطبق عليها
    cart.items = [];
    cart.totalPrice = 0;
    cart.appliedCoupon = null; 
    cart.discount = 0;
    await cart.save();

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. جلب كافة طلبات المستخدم الحالي
// ==========================================
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.menuItem')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. جلب تفاصيل طلب واحد برقم الـ ID
// ==========================================
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItem');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // تأكيد أن الطلب يخص المستخدم المسجل أو أن المستخدم أدمن
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. جلب جميع الطلبات للوحة تحكم الأدمن
// ==========================================
exports.getAllOrdersAdmin = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.menuItem')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 5. جلب أحدث الطلبات لجدول Recent Orders
// ==========================================
exports.getRecentOrdersAdmin = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;

    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.menuItem')
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 6. تحديث حالة الطلب من قِبل الأدمن
// ==========================================
exports.updateOrderStatusAdmin = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 7. جلب إحصائيات لوحة تحكم الأدمن (Stats)
// ==========================================
exports.getAdminStats = async (req, res, next) => {
  try {
    // حساب إجمالي الإيرادات (Total Revenue)
    const revenueAggregation = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;

    // إجمالي الطلبات (Total Orders)
    const totalOrders = await Order.countDocuments();

    // عدد المستخدمين (Active Users)
    const activeUsers = await User.countDocuments();

    // حساب تقريبي لنسبة التحويل (Conversion Rate)
    const conversionRate = totalOrders > 0 ? ((totalOrders / (activeUsers || 1)) * 100).toFixed(1) + '%' : '0%';

    return res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        activeUsers,
        conversionRate
      }
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 8. إضافة منتج جديد (Add New Product)
// ==========================================
exports.createMenuItem = async (req, res, next) => {
  try {
    const { name, category, price, description, image, stock } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, and price are required fields'
      });
    }

    const menuItem = await MenuItem.create({
      name,
      category,
      price: Number(price),
      description,
      image,
      stock: stock !== undefined ? Number(stock) : 100
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: menuItem
    });
  } catch (error) {
    next(error);
  }
};