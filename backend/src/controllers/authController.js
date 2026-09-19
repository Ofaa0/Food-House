const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');
const sendEmail = require('../utils/sendEmail');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, cookieOptions);
        return res.status(201).json({
            success: true,
            data: {
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
                accessToken
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, cookieOptions);
        return res.json({
            success: true,
            data: {
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
                accessToken
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: 'No refresh token provided' });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id).select('+refreshToken');

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user);
        return res.json({
            success: true,
            data: { accessToken: newAccessToken }
        });
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
    }
};

exports.logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const user = await User.findOne({ refreshToken }).select('+refreshToken');
            if (user) {
                user.refreshToken = undefined;
                await user.save();
            }
        }
        res.clearCookie('refreshToken');
        return res.json({ success: true, message: 'Logged out' });
    } catch (err) {
        next(err);
    }
};

// exports.forgotPassword = async (req, res, next) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });

//         if (user) {
//             const resetToken = crypto.randomBytes(32).toString('hex');
//             const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//             user.resetPasswordToken = hashedToken;
//             user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
//             await user.save();

//             const resetUrl = `${process.env.CLIENT_URL || 'http://frontend.com'}/reset-password/${resetToken}`;
//             const message = `You requested a password reset. Please click on this link: \n\n ${resetUrl}`;

//             try {
//                 await sendEmail({ to: user.email, subject: 'Password Reset Request', text: message });
//             } catch (err) {
//                 user.resetPasswordToken = undefined;
//                 user.resetPasswordExpires = undefined;
//                 await user.save();
//             }
//         }

//         return res.json({
//             success: true,
//             message: 'If that email exists in our system, we sent a password reset link.'
//         });
//     } catch (err) {
//         next(err);
//     }
// };

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    // إنشاء التوكن وتشفيره للداتابيز
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 دقائق
    await user.save();

    // إرجاع التوكن الخام في الاستجابة للفرونت إيند مباشرة
    return res.json({
      success: true,
      message: 'Email verified successfully',
      data: { resetToken }
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        }).select('+resetPasswordToken +resetPasswordExpires');

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.json({ success: true, message: 'Password reset successful' });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        return res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};