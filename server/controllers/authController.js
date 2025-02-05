const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(400).send('Registration failed.');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await user.comparePassword(password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
  } else {
    res.status(401).send('Invalid credentials.');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};