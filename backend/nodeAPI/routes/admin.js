const express = require('express');
const control = require('../controllers/admin');
const auth = require('../middleware/authenticate');
const types = require('../middleware/permissions'); 
const valid = require('../middleware/validation'); 
const router = express.Router()

// Create new book
router.post('/books', [valid.book, auth, types.subAdmin], control.addNew);
// Update specific book 
router.patch('/books/:bookId', [auth, types.subAdmin], control.update);
// Delete specific book 
router.delete('/books/:bookId', [auth, types.subAdmin], control.delete);
// List all books 
router.get('/allBooks', control.allBooks);
// Get total number of users 
router.get('/countUsers', [auth, types.subAdmin], control.totalUsers);
// Get total number of books 
router.get('/countBooks', [auth, types.subAdmin], control.totalBooks);
// Get total number of orders 
router.get('/countOrders', [auth, types.subAdmin], control.totalOrders);
// Get total profit 
router.get('/totalProfit', [auth, types.subAdmin], control.totalProfit);
// List all orders |or| only from start-date to end-date
router.get('/allOrders', [auth, types.subAdmin], control.orders);

// List of all users
router.get('/allUsers', [auth, types.admin], control.allUsers);
// Change user type to sub-admin
router.patch('/change/:userId', [auth, types.admin], control.changeUser);

module.exports = router
