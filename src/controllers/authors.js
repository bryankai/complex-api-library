const modelAuth = require('../models/authors')
const model = require('../models/books')
console.log('author controllers')

// Author functions
function getAllAuthors (req, res, next) {
  const id = req.params.id
  const book = model.getOne(id)
  console.log(book)
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
  const name = req.body.name
  console.log(name)
  const newAuthor = modelAuth.updateAuthor(id,name)
  res.status(200).json({ data: newAuthor })
}

function removeAuthor (req, res, next) {
  const id = req.params.id
  const removedAuthor = modelAuth.removeAuthor(id)
  res.status(200).json({ data: removedAuthor })
}

module.exports = { getAllAuthors, getOneAuthor, createAuthor, updateAuthor, removeAuthor }
