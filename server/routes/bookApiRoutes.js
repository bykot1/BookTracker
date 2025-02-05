const express = require('express');
const router = express.Router();
const axios = require('axios');

// Proxy Open Library API search
router.get('/search', async (req, res) => {
  const { title, author } = req.query;
  try {
    console.log(
        "Query\n"
        + `https://openlibrary.org/search.json?q=${title}`
    );
    const response = await axios.get(`https://openlibrary.org/search.json?q=${title}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from Open Library' });
  }
});

module.exports = router;