const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('Library', librarySchema);
