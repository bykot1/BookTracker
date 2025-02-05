const express = require('express');
const router = express.Router();
const axios = require('axios');

// Proxy Open Library API search
router.get('/search', async (req, res) => {
  const { q, genre } = req.query;
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${q}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from Open Library' });
  }
});

module.exports = router;