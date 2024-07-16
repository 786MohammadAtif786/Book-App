const Book = require('../models/Book');
const response = require('../utils/response');

const borrowBook = async (req, res) => {
 try {
  const { bookId, userId } = req.body;
  const book = await Book.findById(bookId);
  if (!book || book.borrower) {
    return response(res, false, null, 'Book not available for borrowing.', 400);
  }
  book.borrower = userId;
  await book.save();
  return response(res, true, book, 'Book borrowing.', 200);
 } catch(err) {
  return response(res, false, null, 'internal server error.', 500);
 }
};

const returnBook = async (req, res) => {
 try {
  const book = await Book.findById(req.params.id);
  if (!book || !book.borrower) {
    return response(res, false, null, 'Book not borrowed.', 400);
  }
  book.borrower = null;
  await book.save();
  return response(res, true, book, 'return book.', 200);
 } catch(err) {
  return response(res, false, null, 'internal server error.', 500);
 }
};

module.exports = { borrowBook, returnBook };
