const jwt = require('jsonwebtoken')
const User = require('../models/user');

module.exports = (req, res, next) => {
    let token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({error: 'Authorization token required'});
    
    jwt.verify(token, 'secret_key', async (err, decoded) => {
      if (err) return res.status(401).json({error: 'Invalid token'});
      try { 
        let user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({error: 'User not found'});
        req.user = user;
        next();
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    });
};