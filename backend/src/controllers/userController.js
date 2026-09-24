const User = require('../models/User'); // تأكد من اسم ملف الموديل عندك
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 1. Register User
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email, password, and name are required"
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // بنبعت الباسورد عادي لأن الموديل بيعمله Hash بنفسه في pre('save')
    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.SECRET_KEY || 'secretkey',
      { expiresIn: "1w" }
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// 2. Update Profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;

    // 🔍 ضيف السطور دي عشان تتأكد البيانات واصلة ولا لأ
    console.log("Req User:", req.user);
    console.log("Req Body:", req.body);
    const { name, email, address, phone } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (address !== undefined) updateData.address = address;
    if (phone !== undefined) updateData.phone = phone;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { currentPassword, newPassword } = req.body;

    // 1. جلب المستخدم بكلمة المرور
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 2. التحقق من الباسورد الحالي
    const isMatch = await user.matchPassword // أو bcrypt.compare(currentPassword, user.password)
      ? await user.matchPassword(currentPassword)
      : await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    // 3. اسند الباسورد الجديد مباشرة من غير bcrypt.hash (إذا كان عندك pre('save') في الـ Schema)
    user.password = newPassword; 
    await user.save(); // الـ Schema هتشفره تلقائياً قبل الحفظ

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
};