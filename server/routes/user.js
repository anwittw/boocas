const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares')
const User = require('../models/User')

// GET all users

router.get('/', isLoggedIn, (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

router.get('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id
  User.find({ _id: id })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
