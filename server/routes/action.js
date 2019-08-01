const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Action = require('../models/Action')

// GET memberships or memberships by user

router.get('/', isLoggedIn, (req, res, next) => {
  Action.find() // .find()  === .find({})
    .populate('_user')
    .populate('_group')
    .populate('_document')
    .then(actions => {
      res.json(actions)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
