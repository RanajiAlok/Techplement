// server/routes/quotes.js
const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote'); // Assuming you have a Quote model

// Endpoint to get random quote
router.get('/random', async (req, res) => {
  try {
    const quotes = await Quote.find();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to search quotes by author
router.get('/search', async (req, res) => {
  try {
    const author = req.query.author;
    const quotes = await Quote.find({ author: new RegExp(author, 'i') }); // Case insensitive search
    if (quotes.length === 0) {
      return res.status(404).json({ message: 'No quotes found for this author.' });
    }
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
