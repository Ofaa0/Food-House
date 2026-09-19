const Cart = require('../models/Cart');

exports.getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate('items.menuItem');
        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }
        return res.json({ success: true, data: cart });
    } catch (err) {
        next(err);
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const { menuItemId, quantity = 1 } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({ menuItem: menuItemId, quantity: Number(quantity) });
        }

        await cart.save();
        cart = await cart.populate('items.menuItem');
        return res.json({ success: true, data: cart });
    } catch (err) {
        next(err);
    }
};

exports.updateCartItem = async (req, res, next) => {
    try {
        const { menuItemId, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        if (quantity <= 0) {
            cart.items = cart.items.filter(item => item.menuItem.toString() !== menuItemId);
        } else {
            const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = Number(quantity);
            } else {
                return res.status(404).json({ success: false, message: 'Item not found in cart' });
            }
        }

        await cart.save();
        cart = await cart.populate('items.menuItem');
        return res.json({ success: true, data: cart });
    } catch (err) {
        next(err);
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        const { menuItemId } = req.params;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.menuItem.toString() !== menuItemId);
        await cart.save();
        cart = await cart.populate('items.menuItem');
        return res.json({ success: true, data: cart });
    } catch (err) {
        next(err);
    }
};

exports.clearCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        return res.json({ success: true, message: 'Cart cleared' });
    } catch (err) {
        next(err);
    }
};