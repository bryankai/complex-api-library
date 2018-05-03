const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/books')
const ctrlAuth = require('../controllers/authors')

console.log('routes')

// Basic Crud Methods
router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', ctrl.create)
router.put('/:id', ctrl.update)
router.delete('/:id', ctrl.remove)

// Nested Methods
router.get('/:id/authors', ctrlAuth.getAllAuthors)
router.get('/:id/authors/:authorId', ctrlAuth.getOneAuthor)
router.post('/:id/authors', ctrlAuth.createAuthor)
router.put('/:id/authors/:authorId', ctrlAuth.updateAuthor)
router.delete('/:id/authors/:authorId', ctrlAuth.removeAuthor)

module.exports = router
