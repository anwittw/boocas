const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Book = require('../models/Book')

// GET all

router.get('/', (req, res, next) => {
  Book.find()
    .then(books => {
      res.json(books)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// GET by Id

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Book.findById(id)
    .then(book => {
      if (!book) {
        next({
          status: 404,
          message: `book with Id: ${id.toString()} not found`,
        })
        return
      }
      res.json(book)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// Create a book
//! Secure roots with Logged in

router.post('/', (req, res, next) => {
  Book.create({
    isbn_10: req.body.isbn_10,
    isbn_13: req.body.isbn_13,
    title: req.body.title,
    author: req.body.author,
    translator: req.body.translator,
    pages: req.body.pages,
    year: req.body.year,
    coverPictureUrl: req.body.coverPictureUrl,
  })
    .then(book => {
      next({ message: book })
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// DELETE one

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Book.findByIdAndDelete(id)
    .then(book => {
      next({ message: book })
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
