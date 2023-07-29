const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  cartItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
  address: {type: String, default: 'eg'},
  type: {type: String, enum: ['user', 'admin', 'sub-admin'], default: 'user'}
});

module.exports = mongoose.model('User', userSchema);
