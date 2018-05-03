const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const file = path.join(__dirname, 'books.json')
let index

function getAll (limit) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  return limit ? books.slice(0, limit) : books
}

function getOne (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = books.find(book => book.id === id)
  index = books.indexOf(book)
  console.log(index)
  if (!book) return { errors:  `can not find ${id}`}
  return book
}

function create (name, borrowed=false, description='', authors) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const errors = []
  let response
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else if (!borrowed && !typeof borrowed === 'boolean') {
      errors.push('borrowed status is required')
      response = { errors }
  } else {
    const authorsArr = authors.split(',')
    // Need to create uuid for each author, put it in an object with two keys: name and id
    // authors will be an array of objects
    const book = { id: uuid(), name: name, borrowed: borrowed, description:description, authors:authorsArr }
    books.push(book)
    response = book
    const json = JSON.stringify(books)
    fs.writeFileSync(file, json)
  }
  return response
}

function update (id, name) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = getOne(id)
  // const index = books.indexOf(book)
  books[index].name = name
  const json = JSON.stringify(books)
  fs.writeFileSync(file, json)
  return books[index]
}

function remove (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = getOne(id)
  // const index = books.indexOf(book)
  const removedBook = books.splice(index,1)
  const json = JSON.stringify(books)
  fs.writeFileSync(file, json)
  return removedBook
}




module.exports = { getAll, getOne, create, update, remove }
