const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const file = path.join(__dirname, 'books.json')

console.log('models')

function getAll (limit) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  return limit ? books.slice(0, limit) : books
}

function getOne (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = books.find(book => book.id === id)
  if (!book) return { errors:  `can not find ${id}`}
  return book
}

function create (name) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const errors = []
  let response
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else {
    const book = { id: uuid(), name: name }
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
  const index = books.indexOf(book)
  books[index].name = name
  const json = JSON.stringify(books)
  fs.writeFileSync(file, json)
  return books[index]
}

function remove (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = getOne(id)
  console.log(book);
  const index = books.indexOf(book)
  const json = JSON.stringify(books)
  fs.writeFileSync(file, json)
  return books.splice(index,1)
}

module.exports = { getAll, getOne, create, update, remove }
