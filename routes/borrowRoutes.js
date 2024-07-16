const express = require('express');
const { borrowBook, returnBook } = require('../controllers/borrowController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/borrow', authMiddleware, roleMiddleware(['borrower']), borrowBook);
router.put('/return/:id', authMiddleware, roleMiddleware(['borrower']), returnBook);

module.exports = router;
