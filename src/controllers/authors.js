const modelAuth = require('../models/authors')
const model = require('../models/books')

// Author functions
function getAllAuthors (req, res, next) {
  const id = req.params.id
  const book = model.getOne(id)
  const data = modelAuth.getAllAuthors(book)
  res.status(200).json({ data })
}

function getOneAuthor (req, res, next) {
  const id = req.params.id
  const book = model.getOne(id)
  const authorId = req.params.authorId
  const data = modelAuth.getOneAuthor(book, authorId)
  res.status(200).json({ data })
}

function createAuthor (req, res, next) {
  const id = req.params.id
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const data = modelAuth.createAuthor(id, firstName, lastName)
  if(data.errors) {
    return next({ status: 400, message: `Could not create new author`, errors: data.errors })
  }
  res.status(201).json({ data })
}

function updateAuthor (req, res, next) {
  const id = req.params.id
  const authorId = req.params.authorId
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const newAuthor = modelAuth.updateAuthor(id, authorId, firstName, lastName)
  res.status(200).json({ data: newAuthor })
}

function removeAuthor (req, res, next) {
  const id = req.params.id
  const authorId = req.params.authorId
  const removedAuthor = modelAuth.removeAuthor(id, authorId)
  res.status(200).json({ data: removedAuthor })
}

module.exports = { getAllAuthors, getOneAuthor, createAuthor, updateAuthor, removeAuthor }
