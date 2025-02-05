// Express Server Setup
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const authRoutes = require('../server/routes/authRoutes');
const authenticateToken = require('../server/middleware/auth');
const connectDB = require('./config/db');
const bookApiRoutes = require('./routes/bookApiRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

//User Authentication
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const jwt = require('jsonwebtoken');
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.username = user.username;  // Pass username globally
    } catch (err) {
      res.locals.username = null;
    }
  } else {
    res.locals.username = null;
  }
  next();
});

//Set up handlebars engine
app.engine('hbs', exphbs.engine({ 
  extname: 'hbs', 
  defaultLayout: "main",
  partialsDir: path.join(__dirname, 'partials')
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

//Start server listening and handle errors
app.use('/api/books', bookApiRoutes);
app.use('/', authRoutes);

const server = app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);
process.on("unhandledRejection", err => {
  console.log(`An error occured: ${err.message}`)
  server.close(() => process.exit(1))
});

//Base routes
app.get('/', authenticateToken, (req, res) => {
  res.render('index', { username: req.user.username });
});

app.get('/index', authenticateToken, (req, res) => {
  res.render('index', { username: req.user.username });
});

app.get('/search', authenticateToken, (req, res) => {
  res.render('search', { username: req.user.username });
});

app.get('/profile', authenticateToken, (req, res) => {
  res.render('profile', { username: req.user.username });
});

//404 everything else
app.get('*', authenticateToken, (req, res) => {
  res.status(404).render('404', { username: req.user.username });
});