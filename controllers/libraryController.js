// controllers/libraryController.js
const Library = require('../models/Library');
const Book = require('../models/Book');

const getLibraries = async (req, res) => {
  const libraries = await Library.find().populate({
    path: 'books',
    populate: { path: 'borrower' }
  });
  res.send(libraries);
};

const getLibraryById = async (req, res) => {
  const library = await Library.findById(req.params.id).populate({
    path: 'books',
    populate: { path: 'borrower' }
  });
  if (!library) {
    return res.status(404).send({ error: 'Library not found.' });
  }
  res.send(library);
};

const createLibrary = async (req, res) => {
  const library = new Library(req.body);
  await library.save();
  res.status(201).send(library);
};

const updateLibrary = async (req, res) => {
  const library = await Library.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!library) {
    return res.status(404).send({ error: 'Library not found.' });
  }
  res.send(library);
};

const deleteLibrary = async (req, res) => {
  const library = await Library.findByIdAndDelete(req.params.id);
  if (!library) {
    return res.status(404).send({ error: 'Library not found.' });
  }
  res.send(library);
};

const getLibraryInventory = async (req, res) => {
  const library = await Library.findById(req.params.id).populate('books');
  if (!library) {
    return res.status(404).send({ error: 'Library not found.' });
  }
  res.send(library.books);
};

const addBookToInventory = async (req, res) => {
  const { bookId } = req.body;
  const library = await Library.findById(req.params.id);
  if (!library) {
    return res.status(404).send({ error: 'Library not found.' });
  }
  library.books.push(bookId);
  await library.save();
  res.send(library);
};

const removeBookFromInventory = async (req, res) => {
  const { bookId } = req.params;
  const library = await Library.findById(req.params.id);
  if (!library) {
    return res.status(404).send({ error: 'Library not found.' });
  }
  library.books.pull(bookId);
  await library.save();
  res.send(library);
};

module.exports = { getLibraries, getLibraryById, createLibrary, updateLibrary, deleteLibrary, getLibraryInventory, addBookToInventory, removeBookFromInventory };
