const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
    stock: { type: Number, default: 50 }
}, { timestamps: true });

menuItemSchema.pre('save', function (next) {
    if (this.stock <= 0) {
        this.stock = 0;
        this.available = false;
    } else {
        this.available = true;
    }
    next();
});

module.exports = mongoose.model('MenuItem', menuItemSchema);