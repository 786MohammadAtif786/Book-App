const express = require('express');
const { getLibraries, getLibraryById, createLibrary, updateLibrary, deleteLibrary, getLibraryInventory, addBookToInventory, removeBookFromInventory } = require('../controllers/libraryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getLibraries);
router.get('/:id', authMiddleware, getLibraryById);
router.post('/', authMiddleware, roleMiddleware(['author']), createLibrary);
router.put('/:id', authMiddleware, roleMiddleware(['author']), updateLibrary);
router.delete('/:id', authMiddleware, roleMiddleware(['author']), deleteLibrary);
router.get('/:id/inventory', authMiddleware, getLibraryInventory);
router.post('/:id/inventory', authMiddleware, roleMiddleware(['author']), addBookToInventory);
router.delete('/:id/inventory/:bookId', authMiddleware, roleMiddleware(['author']), removeBookFromInventory);

module.exports = router;
