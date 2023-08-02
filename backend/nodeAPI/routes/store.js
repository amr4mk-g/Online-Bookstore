const express = require('express');
const control = require('../controllers/store');
const router = express.Router()

// List all books 
router.get('/books', control.books);
// Get specific book  
router.get('/books/:bookId', control.book);
// List books by search name | category | price range
router.get('/search', control.search);

module.exports = router
