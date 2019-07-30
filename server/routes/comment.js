const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Comment = require('../models/Comment')

router.get('/', (req, res, next) => {
  // empty Object === No Filter
  let filter = {}
  //Filteroption: mine
  if (req.query.mine) {
    filter = { ...filter, _user: req.user._id }
  }
  if (req.query.thought) {
    filter = { ...filter, _thought: req.query.thought }
  }
  Comment.find(filter)
    .populate('_user')
    .then(comments => {
      res.json(comments)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Comment.findById(id)
    .then(comment => {
      res.json(comment)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

router.post('/', (req, res, next) => {
  Comment.create({
    _user: req.user._id,
    _thought: req.body._thought,
    content: req.body.content,
  })
    .then(comment => {
      res.json(comment)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// DELETE one comment

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Comment.findById(id)
    .then(comment => {
      if (!comment) {
        next({
          status: 404,
          message: `comment with Id: ${id.toString()} not found`,
        })
        return
      }
      if (req.user._id.toString() !== comment._user.toString()) {
        next({
          status: 403,
          message: 'You are not allowed to delete this comment',
        })
        return
      }
      Comment.findByIdAndDelete(id).then(comment => res.json(comment))
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
