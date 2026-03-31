const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    qty: {
        type: Number,
        required: true,
        min: 1, // Ensures they order at least 1 item
        default: 1
    },
    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Order', orderSchema);