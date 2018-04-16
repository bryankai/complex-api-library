# Complex-API: Technical Library

A built-from-scratch API with an MVC architecture.  Used to get, push, post, and delete authors in books and books in a library.

## Setup

1. Fork and clone this repository
2. Run `npm install`
3. Run the tests with `npm test`
4. Run the server in development mode with `npm run dev` or run it in production mode with `npm start`


## Development Requirements
Follow RESTful patterns
Use an opinionated architecture (ie. MVC)
Include error handling
Include nested resources
Stores data in a file (e.g. .json, .csv)
You may optionally test your project.

### Books
* ID: (You Choose) A unique id that represents the book. Created automatically.
* Name: (String) Name of the book. Cannot be longer than 30 characters. Required.
* Borrowed: (Boolean) True/false value that represents whether or not the book has been borrowed. Required. Defaults to false.
* Description: (String) A description of the book. Optional.
* Authors: (Array) An array of authors.

### Authors
* ID: (You Choose) A unique id that represents the author. Created automatically.
* First Name: (String) First name of the author. Required.
* Last Name: (String) Last name of the author. Required.
* Authors will have different IDs even if they have the same first and last name.

### RESTful routes can:
Create, Read, Update, and Delete books
Create, Read, Update, and Delete authors through books
