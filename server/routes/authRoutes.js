const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await user.comparePassword(password)) {
    const token = jwt.sign({ id: user._id }, process.token.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    res.render('register', { error: 'Registration failed' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;