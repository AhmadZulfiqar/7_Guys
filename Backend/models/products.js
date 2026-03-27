const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { 
    type: String, 
    required: true,
    enum: ['Pizza', 'Burger', 'Deal', 'Fries', 'Nuggets', 'Drinks', 'Deals', 'Wings'] 
  },
  img_url: { type: String, required: true },
  description: { type: String, trim: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);