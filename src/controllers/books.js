const model = require('../models/books')

console.log('controllers')

function getAll (req, res, next) {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json({ data })
}

function getOne (req, res, next) {
  const id = req.params.id
  const data = model.getOne(id)
  res.status(200).json({ data })
}

function create (req, res, next) {
  const name = req.body.name
  const data = model.create(name)

  if(data.errors) {
    return next({ status: 400, message: `Could not create new book`, errors: data.errors })
  }
  res.status(201).json({ data })
}

function update (req, res, next) {
  const id = req.params.id
  const name = req.body.name
  console.log(name)
  const newBook = model.update(id,name)
  res.status(200).json({ data: newBook })
}

function remove (req, res, next) {
  const id = req.params.id
  const removedBook = model.remove(id)
  res.status(200).json({ data: removedBook })
}

module.exports = { getAll, getOne, create, update, remove, }
