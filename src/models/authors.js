// Authors Functions
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const file = path.join(__dirname, 'books.json')
const modelBooks = require('./books.js')

function getAllAuthors (book) {
  return book.authors
}

function getOneAuthor (book, authorId) {
  const authors = book.authors
  const author = authors.find(author => author.id == authorId)
  let index = authors.indexOf(author)
  if (!author) return { errors:  `can not find ${authorId}`}
  return author
}

function createAuthor (id, firstName, lastName) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = books.find(book => book.id === id)
  if (!book) return { errors:  `can not find ${id}`}
  let index = books.indexOf(book)
  const authors = book.authors
  const errors = []
  let response
  if (!firstName) {
    errors.push('First name is required')
    response = { errors }
  } else if (!lastName) {
    errors.push('Last name is required')
    response = { errors }
  } else {
    const author = { id: uuid(), firstName, lastName }
    authors.push(author)
    response = author
    books[index] = book
    const json = JSON.stringify(books)
    fs.writeFileSync(file, json)
  }
  return response
}

function updateAuthor (id, authorId, firstName, lastName) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = books.find(book => book.id === id)
  const index = books.indexOf(book)
  if (!book) return { errors:  `can not find ${id}`}
  const authors = book.authors
  const author = authors.find(author => author.id == authorId)
  let authorIndex = authors.indexOf(author)
  if (!author) return { errors:  `can not find ${authorId}`}
  if (!firstName) return { errors:  'First Name is required'}
  if (!lastName) return { errors:  'Last Name is required'}
  // edit the author name
  author.firstName = firstName
  author.lastName = lastName
  books[index].authors[authorIndex] = author
  const json = JSON.stringify(books)
  fs.writeFileSync(file, json)
  return author
}

function removeAuthor (id, authorId) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = books.find(book => book.id == id)
  const index = books.indexOf(book)
  if (!book) return { errors:  `can not find ${id}`}
  const authors = book.authors
  const author = authors.find(author => author.id == authorId)
  let authorIndex = authors.indexOf(author)
  if (!author) return { errors:  `can not find ${authorId}`}
  // delete author by id
  const removedAuthor = authors.splice(authorIndex,1)
  const json = JSON.stringify(books)
  fs.writeFileSync(file, json)
  return removedAuthor
}

module.exports = {getAllAuthors, getOneAuthor, createAuthor, updateAuthor, removeAuthor}
