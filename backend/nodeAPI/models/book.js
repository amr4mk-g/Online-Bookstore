const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {type: String, required: true},
  costPrice: {type: Number, required: true},
  sellingPrice: {type: Number, required: true},
  category: {type: String, required: true},
  description: {type: String, required: true},
  imageURL: {type: String, required: true},
  quantity: {type: Number, required: true}
});

module.exports = mongoose.model('Book', bookSchema);
