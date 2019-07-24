const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Comment = require('../models/Group')

router.get('/', (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.json(comments)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Comment.findbyId(id)
    .then(comment => {
      res.json(comment)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// DELETE one

router.delete('/:id', (req, res, next) => {
  let userId = req.user._id
  let id = req.params.id

  Comment.findbyId(id)
    .then(comment => {
      if (userId.toString() === comment._user.toString()) {
        Comment.findByIdAndDelete(id).then(comment => {
          next({ message: comment })
        })
      } else {
        next({
          status: 400,
          message: 'You are not allowed to delete this comment',
        })
      }
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
