const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    items: [
      {
        menuItem: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'MenuItem', 
          required: true 
        },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Paypal'],
      default: 'Credit Card'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Paid'
    },
    cardDetails: {
      cardHolder: { type: String },
      lastFourDigits: { type: String }
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending'
    },
    deliveryAddress: { type: String, required: false } // خلّيها false لو بتسجل العنوان من البروفايل
  },
  { 
    timestamps: true // بتعمل createdAt و updatedAt تلقائياً وبدقة
  }
);

module.exports = mongoose.model('Order', orderSchema);