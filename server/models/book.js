const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  status: { type: String, enum: ['Read', 'Currently Reading', 'To Read'], default: 'To Read' }
});

module.exports = mongoose.model('Book', bookSchema);