const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  status: {type: String, enum: ['processing', 'shipped', 'delivered'], default: 'processing'},
  date: {type: Date, default: Date.now},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  books: [{bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true}, 
      price: {type: Number, required: true}}],
  payment: {type: String, enum: ['cash', 'credit'], required: true},
  address: {type: String, required: true},
  profit: {type: Number, required: true},
  total: {type: Number, required: true}
});

module.exports = mongoose.model('Order', orderSchema);
