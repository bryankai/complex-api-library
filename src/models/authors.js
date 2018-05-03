// Authors Functions
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const file = path.join(__dirname, 'books.json')
const modelBooks = require('./books.js')

console.log('author models')

function getAllAuthors (book) {
  return book.authors
}

function getOneAuthor (book, authorId) {
  const authors = book.authors
  const author = authors.find(author => author.id === authorId)
  console.log(index)
  if (!author) return { errors:  `can not find ${authorId}`}
  return author
}

function createAuthor (id, firstName, lastName) {
  const book = modelBooks.getOne(id)
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  let index = books.indexOf(book)
  console.log(index);
  const authors = book.authors
  console.log(book)
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
    console.log(books)
    const json = JSON.stringify(books)
    fs.writeFileSync(file, json)
  }
  return response
}

function updateAuthor (id, name) {
  const contents = fs.readFileSync(file, 'utf-8')
  const authors = JSON.parse(contents)
  const author = getOne(id)
  const index = authors.indexOf(author)
  authors[index].name = name
  const json = JSON.stringify(authors)
  fs.writeFileSync(file, json)
  return authors[index]
}

function removeAuthor (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const authors = JSON.parse(contents)
  const author = getOne(id)
  console.log(author);
  const index = authors.indexOf(author)
  const json = JSON.stringify(authors)
  fs.writeFileSync(file, json)
  return authors.splice(index,1)
}

module.exports = {getAllAuthors, getOneAuthor, createAuthor, updateAuthor, removeAuthor}
