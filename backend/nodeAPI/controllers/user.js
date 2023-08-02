const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Order = require('../models/order');
const Book = require('../models/book');

module.exports = {
   login: async (req, res) => {
      try { 
         let {email, password} = req.body;
         let user = await User.findOne({email});
         if (!user) return res.status(401).json({error: 'Invalid email or password.'});
         let match = await bcrypt.compare(password, user.password);
         if (!match) return res.status(401).json({error: 'Invalid email or password.'});
         let token = jwt.sign({userId: user._id}, 'secret_key', {expiresIn: '5h'});
         res.status(200).json({token});
      } catch (err) {
         res.status(500).json({error: err.message});
      }
   },
  
   signup: async (req, res) => {
      try {
         let {name, email, password} = req.body;
         let existing = await User.findOne({email});
         if (existing) return res.status(409).json({error: 'This email already exists'});
         let hashed = await bcrypt.hash(password, 10);
         let user = new User({name, email, password: hashed});
         await user.save();
         let token = jwt.sign({userId: user._id}, 'secret_key', {expiresIn: '5h'});
         res.status(200).json({token});
      } catch (err) {
         res.status(500).json({error: err.message});
      }
   },

   reset: async (req, res) => {
      try {
         let {email} = req.body;
         let user = await User.findOne({email});
         if (!user) return res.status(401).json({error: 'Invalid email'});
         //Send an email containing a link to reset the password
         res.status(200).json({message: 'Email has been sent'});
      } catch (err) {
         res.status(500).json({error: err.message});
      }
   },

   profile: async (req, res) => {
      try {
         let user = req.user
         if (user) res.status(200).json({name: user.name, email: user.email, 
            cartItems: user.cartItems, address: user.address});
      } catch (err) {
         res.status(500).json({error: err.message});
      }
   },

   orders: async (req, res) => {
      try {
         let userId = req.user._id;
         let orders = await Order.find({userId}, {_id:0, userId:0, profit:0});
         res.status(200).json({"user orders": orders});
      } catch (err) {
         res.status(500).json({error: err.message});
      }
   },

   address: async (req, res) => {
      try {
         const {address} = req.body;
         req.user.address = address;
         await req.user.save();
         res.status(200).json({message: 'Shipping address updated successfully'});
       } catch (err) {
         res.status(400).json({error: err.message});
       }
   },

   cart: async (req, res) => {
      try {
         let items = req.user.cartItems;
         let books = await Book.find({ _id: {$in:items}}, {_id:0, costPrice:0});
         res.status(200).json({"user cart": books});
      } catch (err) {
         res.status(500).json({error: err.message});
      }
   },

   addToCart: async (req, res) => {
      try {
         let {bookId} = req.params;
         let book = await Book.findById(bookId);
         if (!book) return res.status(404).json({error: 'Book not found'});
         if (req.user.cartItems.includes(bookId)) 
           return res.status(400).json({error: 'Book is already in the cart'});
         if (book.quantity < 1) 
            return res.status(400).json({error: 'Book is out of stock'});
         req.user.cartItems.push(bookId);
         await req.user.save();
         res.status(200).json({message: 'Book added to cart successfully'});
      } catch (err) {
         res.status(400).json({error: err.message});
      }
   },

   removeFromCart: async (req, res) => {
      try {
         let {bookId} = req.params;
         let book = await Book.findById(bookId);
         if (!book) return res.status(404).json({error: 'Book not found'});
         if (!req.user.cartItems.includes(bookId))
           return res.status(400).json({error: 'Book is not in the cart'});
         let index = req.user.cartItems.indexOf(bookId);
         req.user.cartItems.splice(index, 1);
         await req.user.save();
         res.status(200).json({message: 'Book removed from cart successfully'});
      } catch (err) {
         res.status(400).json({error: err.message});
      }
   },

   newOrder: async (req, res) => {
      try {
         let items = req.user.cartItems
         if (items.length == 0) 
            return res.status(400).json({error: 'Cart does not contain any books to order'});
         let books = await Book.find({_id: {$in: items}});
         for (let book of books) {
            if (book.quantity < 1) return res.status(400).json({error: `${book.name} is out of stock.`});
         }
         let profit = 0;
         let total = 0;
         for (let book of books) {
            let cost = parseFloat(book.costPrice);
            let sell = parseFloat(book.sellingPrice);
            if (isNaN(cost) || isNaN(sell)) 
               return res.status(400).json({error: `Invalid book price for: ${book.name}`});
            profit += sell-cost;
            total += sell;
         }
         let order = new Order({ userId: req.user._id, profit, total,
            payment: 'cash', address: req.user.address,
            books: books.map(it => ({bookId: it._id, price: it.sellingPrice})) });
         await order.save();
         for (let book of books) {
            book.quantity -= 1;
            await book.save();
         }
         req.user.cartItems = [];
         await req.user.save();
         res.status(201).json({message: 'Order created successfully'});
      } catch (err) {
         res.status(400).json({error: err.message});
      }
   }
}
