// Express Server Setup (server/server.js)
const express = require('express');
const connectDB = require('./config/db.js');
const bookRoutes = require('./routes/bookRoutes.js');
const path = require('path');

const app = express();
// connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
// app.use('/api/books', bookRoutes);

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });