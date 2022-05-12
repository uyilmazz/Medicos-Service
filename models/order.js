const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderCode: {
        type: String,
        required: true,
        unique: true
    },
    orderItems: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    deliveryTime: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;