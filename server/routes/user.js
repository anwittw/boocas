const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
