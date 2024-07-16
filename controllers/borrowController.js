// controllers/borrowController.js
const Book = require('../models/Book');

const borrowBook = async (req, res) => {
  const { bookId, userId } = req.body;
  const book = await Book.findById(bookId);
  if (!book || book.borrower) {
    return res.status(400).send({ error: 'Book not available for borrowing.' });
  }
  book.borrower = userId;
  await book.save();
  res.send(book);
};

const returnBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book || !book.borrower) {
    return res.status(400).send({ error: 'Book not borrowed.' });
  }
  book.borrower = null;
  await book.save();
  res.send(book);
};

module.exports = { borrowBook, returnBook };
