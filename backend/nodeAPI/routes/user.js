const express = require('express');
const control = require('../controllers/user');
const auth = require('../middleware/authenticate'); 
const valid = require('../middleware/validation'); 
const router = express.Router()

// Create new user
router.post('/signup', [valid.signup], control.signup);
// Login user
router.post('/login', [valid.login], control.login);
// Reset user password 
router.post('/reset', [valid.reset], control.reset);
// View user profile info
router.get('/profile', [auth], control.profile);
// List all user orders
router.get('/orders', [auth], control.orders);
// Add or Update shipping address
router.post('/shipping', [valid.address, auth], control.address);
// List user cart books
router.get('/cart', [auth], control.cart);
// Add book to user cart
router.post('/cart/:bookId', [auth], control.addToCart);
// Remove book from user cart
router.delete('/cart/:bookId', [auth], control.removeFromCart);
// Create new order 
router.post('/order', [auth], control.newOrder);

module.exports = router