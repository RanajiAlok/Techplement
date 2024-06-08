const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/quotes');

const quoteSchema = new mongoose.Schema({
  text: String,
  author: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

app.get('/api/quotes/random', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const randomQuote = response.data[0];
    res.json({ text: randomQuote.q, author: randomQuote.a });
  } catch (error) {
    res.status(500).send('Error fetching quote');
  }
});

app.get('/api/quotes/search', async (req, res) => {
  const { author } = req.query;
  try {
    const quotes = await Quote.find({ author: new RegExp(author, 'i') });
    res.json(quotes);
  } catch (error) {
    res.status(500).send('Error fetching quotes');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
