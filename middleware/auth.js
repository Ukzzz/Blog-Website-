const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.redirect('/login');
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.redirect('/login');
  }
};

module.exports = { authenticateUser };
