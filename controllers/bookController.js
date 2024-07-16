const Book = require('../models/Book');
const Library = require('../models/Library');
const User = require('../models/User');
const bucket = require('../config/firebase');

const getBooks = async (req, res) => {
  const books = await Book.find().populate('author library borrower');
  res.send(books);
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author library borrower');
  if (!book) {
    return res.status(404).send({ error: req.messages.bookNotFound });
  }
  res.send(book);
};

const createBook = async (req, res) => {
   //const { title, library, image } = req.body;
  const { title, library } = req.body;

  // const file = bucket.file(`book_covers/${Date.now()}_${image.originalname}`);
  // await file.save(image.buffer, {
  //   metadata: { contentType: image.mimetype }
  // });

  const book = new Book({
    title,
    author: req.user._id,
    library,
    //image: file.publicUrl()
  });

  await book.save();

  await Library.findByIdAndUpdate(library, {
    $push: { books: book._id }
  });

  res.status(201).send(book);
};

const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) {
    return res.status(404).send({ error: req.messages.bookNotFound });
  }
  res.send(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).send({ error: req.messages.bookNotFound });
  }
  await Library.findByIdAndUpdate(book.library, {
    $pull: { books: book._id }
  });
  res.send(book);
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
