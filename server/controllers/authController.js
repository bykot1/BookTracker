const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect('/login');
  } catch (error) {
    // console.log(error.message);
    // if(error.message.includes("MongoServerError: E11000 duplicate key error")) {
    //   res.render('register', { error: "Username already exists. Please select a new username." });
    // } else {
    //   res.render('register', { error });
    // }
    
    res.render('register', { error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await user.comparePassword(password)) {
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
  } else {
    // res.status(401).send('Invalid credentials.');
    res.render('login', { error: 'Invalid username or password. Please try again.' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};