const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Group = require('../models/Group')

const Membership = require('../models/Membership')

// GET all

router.get('/', (req, res, next) => {
  let filter = {}
  if (req.query.book) {
    filter = { ...filter, _book: req.query.book }
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
  Group.findById(id)
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

router.delete('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id
  Membership.findOne({ _group: id, _user: req.user._id, isCreator: true })
    .then(membership => {
      if (!membership) {
        next({ message: 'You are not allowed' })
        return
      } else {
        Group.findByIdAndDelete(id).then(group => {
          res.json({ message: 'Group was deleted' })
        })
      }
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
