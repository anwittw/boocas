const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const uploader = require('../configs/cloudinary')

const Thought = require('../models/Thought')

router.get('/', (req, res, next) => {
  // empty Object === No Filter
  let filter = {}
  //Filteroption: mine
  if (req.query.mine) {
    filter = { ...filter, _user: req.user._id }
  }

  if (req.query.group) {
    filter = { ...filter, _group: req.query.group }
  }

  Thought.find(filter)
    .then(thoughts => {
      res.json(thoughts)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Thought.findById(id)
    .then(thought => {
      res.json(thought)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

router.post('/', uploader.single('picture'), (req, res, next) => {
  Thought.create({
    _user: req.user._id,
    _group: req.body._groupId,
    title: req.body.title,
    quote: req.body.quote,
    book_chapter: req.body.book_chapter,
    book_page: req.body.book_chapter,
    content: req.body.content,
    titlePictureUrl: req.file.url,
    links: req.body.links,
  })
    .then(thought => {
      res.json(thought)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// DELETE one thought

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Thought.findById(id)
    .then(thought => {
      if (!thought) {
        next({
          status: 404,
          message: `thought with Id: ${id.toString()} not found`,
        })
        return
      }
      if (req.user._id.toString() !== thought._user.toString()) {
        next({
          status: 403,
          message: 'You are not allowed to delete this thought',
        })
        return
      }
      Thought.findByIdAndDelete(id).then(thought => res.json(thought))
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
