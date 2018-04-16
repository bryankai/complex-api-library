const app = require('../app.js')
const chai = require('chai')
const express = chai.expect
// const ( {Books} ) =

chai.use(require(chai-http))
describe('Technical Library', function() {
  describe('Books', function () {
    describe('POST /books', function () {
      it('should create a new book', function (done) {
        const name = 'Book 1'
        chai.request(app)
          .post(`/books`)
          .send({ name })
          .end((err, res) => {
            expect(res.status).to.equal(201)
            expect(res.body.data).to.be.ok
            expect(res.body.data.id).to.be.ok
            expect(res.body.data.name).to.equal(name)
            expect(res.body.data.authors).to.not.be.ok
            done()
          })
      })
    })
  })
})
