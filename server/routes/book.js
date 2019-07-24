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
  Book.findbyId(id)
    .then(book => {
      res.json(book)
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
