const Book = require("../models/Book");
const Library = require("../models/Library");
const User = require("../models/User");
const bucket = require("../config/firebase");
const response = require("../utils/response");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author library borrower");
    if (!books) {
      return response(res, false, null, "Books are Not found", 404);
    }
    return response(res, true, books, "Books Found successfully", 200);
  } catch (err) {
    console.log(err);
    return response(res, false, null, "Internal server error", 500);
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "author library borrower"
    );
    if (!book) {
      return response(res, false, null, "Book are not found", 404);
    }
    return response(res, true, book, "Book Found SuccessFully", 200);
  } catch (err) {
    return response(res, false, null, "Internal server error", 500);
  }
};

const createBook = async (req, res) => {
  try {
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
      $push: { books: book._id },
    });
    return response(res, true, book, "Book created successfully", 201);
  } catch (err) {
    return response(res, false, null, "Internal server error", 500);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return response(res, false, null, "Book is Nt found", 404);
    }
    return response(res, true, book, "Book updated successfully", 200);
  } catch (err) {
    return response(res, false, null, "Internal server error", 500);
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return response(res, false, null, "Book are Not deleted", 404);
    }
    await Library.findByIdAndUpdate(book.library, {
      $pull: { books: book._id },
    });
    return response(res, true, book, "Book are deleted successfully", 200);
  } catch (err) {
    return response(res, false, null, "Internal server error", 500);
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
