const Book = require('../models/book');
const mongoose = require('mongoose');

module.exports = {
    books: async (req, res) => {
      try {
        let books = await Book.find({}, {costPrice:0});
        res.json(books);
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    },

   book: async (req, res) => {
      try {
        let {bookId} = req.params;
        if (!mongoose.isValidObjectId(bookId)) 
            return res.status(400).json({error: 'Invalid book-id'});
      //  let book = await Book.findById(bookId); 
        let book = await Book.findOne({_id:bookId}, {costPrice:0});
        if (!book) return res.status(404).json({error: 'Book not found'});
        res.json(book);
      } catch (err) {
        res.status(500).json({error: err.message});
      }
   },

   search: async (req, res) => {
    try {
      let {name, category, minPrice, maxPrice} = req.query;
      let filters = {};
      if (name) filters.name = {$regex: name, $options: 'i'};
      if (category) filters.category = {$regex: category, $options: 'i'};
      if (minPrice && maxPrice) filters.sellingPrice = {$gte: parseFloat(minPrice), $lte: parseFloat(maxPrice)};
      else if (minPrice) filters.sellingPrice = {$gte: parseFloat(minPrice)};
      else if (maxPrice) filters.sellingPrice = {$lte: parseFloat(maxPrice)};
      let books = await Book.find(filters, {costPrice:0});
      res.json(books);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
   }
}