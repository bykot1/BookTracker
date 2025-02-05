// Express Server Setup
const express = require('express');
const fs = require('fs')
const path = require('path');
const exphbs = require('express-handlebars');
// const connectDB = require('./config/db.js');
// const bookRoutes = require('./routes/bookRoutes.js');
const PORT = process.env.PORT || 3000;

const app = express();

//Set up handlebars engine
app.engine('hbs', exphbs.engine({ 
  extname: 'hbs', 
  defaultLayout: "main",
  partialsDir: path.join(__dirname, 'partials')
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//MongoDB
// connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
// app.use('/api/books', bookRoutes);

//Handlebars routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/search', (req, res) => {
  res.render('search', { genres });
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

//404 everything else
app.get('*', (req, res) => {
  res.status(404).render('404');
});

// Read genres from genres.json for search filter dropdown menu
const genres = JSON.parse(fs.readFileSync(path.join(__dirname, 'genres.json')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));