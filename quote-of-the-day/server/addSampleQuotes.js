
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quoteSchema = new mongoose.Schema({
  text: String,
  author: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

const sampleQuotes = [
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
];

Quote.insertMany(sampleQuotes)
  .then(() => {
    console.log('Sample quotes added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error adding sample quotes:', err);
    mongoose.connection.close();
  });
