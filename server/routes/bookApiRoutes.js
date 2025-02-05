const express = require('express');
const router = express.Router();
const axios = require('axios');

// Proxy Open Library API search
router.get('/search', async (req, res) => {
  const { title, author } = req.query;
  try {
    if(title.length > 0 && author.length > 0) {
      var query = `https://openlibrary.org/search.json?q=${title}&author=${author}`;
    } else if (title.length > 0 && author.length == 0) {
      var query = `https://openlibrary.org/search.json?q=${title}`;
    } else if (title.length == 0 && author.length > 0) {
      var query = `https://openlibrary.org/search.json?author=${author}`;
    }

    console.log("QUERY - " + query);
    const response = await axios.get(query);
    res.json(response.data);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from Open Library' });
  }
});

module.exports = router;