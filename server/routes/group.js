const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Group = require('../models/Group')

// GET all

router.get('/', (req, res, next) => {
  let filter = {}
  if (req.query.book) {
    filter = filter._book = req.query.book
  }
  Group.find(filter)
    .then(groups => {
      res.json(groups)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// GET by Id
//! Secure roots with Logged in

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

// Create a group
//! Secure roots with Logged in

router.post('/', (req, res, next) => {
  Group.create({
    _book: req.body._book,
    name: req.body.name,
    description: req.body.description,
    isPrivate: req.body.isPrivate,
  })
    .then(group => {
      next({ message: group })
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// DELETE one
//! Secure roots with Logged in
//! Create Admin to secure book delete process

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
