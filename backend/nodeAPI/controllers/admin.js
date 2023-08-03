const User = require('../models/user');
const Order = require('../models/order');
const Book = require('../models/book');

module.exports = {
   addNew: async (req, res) => {
    try {
        let book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
      } catch (err) {
        res.status(400).json({error: err.message});
      }
   },

   update: async (req, res) => {
    try {
        let {bookId} = req.params;
        const book = await Book.findByIdAndUpdate(bookId, req.body, {new: true});
        if (!book) return res.status(404).json({error: 'Book not found'});
        res.status(200).json(book);
      } catch (err) {
        res.status(400).json({error: err.message});
      }
   },

   delete: async (req, res) => { 
    try {
        let {bookId} = req.params;
        let book = await Book.findByIdAndDelete(bookId);
        if (!book) return res.status(404).json({error: 'Book not found'});
        res.json({message: 'Book deleted successfully'});
      } catch (err) {
        res.status(400).json({error: err.message});
      }
   },

   allBooks: async (req, res) => {
    try {
      let books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  },

  allUsers: async (req, res) => {
    try {
      let books = await User.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  },

   totalUsers: async (req, res) => {
    try {
        let total = await User.countDocuments();
        res.json({"totalUsers": total});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
   },

   totalBooks: async (req, res) => {
    try {
        const total = await Book.countDocuments();
        res.json({"totalBooks": total});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
   },

   totalOrders: async (req, res) => { 
    try {
        const total = await Order.countDocuments();
        res.json({"totalOrders": total});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
   },

   totalProfit: async (req, res) => {
    try {
        let orders = await Order.find();
        let profit = orders.reduce((total, order) => total + order.profit, 0);
        res.json({"totalProfit": profit});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
   },

   orders: async (req, res) => {
    try {
        let {startDate, endDate} = req.query;
        let filters = {};
        if (startDate && endDate) 
            filters.date = {$gte: new Date(startDate), $lte: new Date(endDate)};
        let orders = await Order.find(filters);
        res.json(orders);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
   },

   changeUser: async (req, res) => {
     try {
        let {userId} = req.params;
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({error: 'User not found'});
        if (user.type === 'admin' || user.type === 'sub-admin')
          return res.status(400).json({error: 'Cannot change user type!'});
        user.type = 'sub-admin';
        await user.save();
        res.json({message: 'User type changed to sub-admin successfully'});
      } catch (err) {
        res.status(400).json({error: err.message});
      }
   }
}
