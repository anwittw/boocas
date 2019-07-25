const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Group = require('../models/Group')

// GET all

router.get('/', (req, res, next) => {
  Group.find()
    .then(groups => {
      res.json(groups)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// GET by Id

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Group.findbyId(id)
    .then(group => {
      res.json(group)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// Give groups where bookid = :bookid

router.get('/:bookId', (req, res, next) =>
  Group.find({ _book: req.params.bookId }).populate('_book')
)

// Create a group

router.post('/', (req, res, next) => {
  Group.create({
    isbn10: req.body.isbn_10,
    isbn13: req.body.isbn_13,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
  })
    .then(group => {
      next({ message: group })
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// DELETE one

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Group.findByIdAndDelete(id)
    .then(group => {
      next({ message: group })
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
