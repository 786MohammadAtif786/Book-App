// routes/bookRoutes.js
const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getBooks);
router.get('/:id', authMiddleware, getBookById);
router.post('/', authMiddleware, roleMiddleware(['author']), createBook);
router.put('/:id', authMiddleware, roleMiddleware(['author']), updateBook);
router.delete('/:id', authMiddleware, roleMiddleware(['author']), deleteBook);

module.exports = router;
