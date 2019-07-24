const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Group = require('../models/Group')

router.get('/', (req, res, next) => {
  Group.find()
    .then(groups => {
      res.json(groups)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

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

module.exports = router
