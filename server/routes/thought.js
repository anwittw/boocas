const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const uploader = require('../configs/cloudinary')

const Thought = require('../models/Thought')
const Action = require('../models/Action')

// GET all Thoughts

router.get('/', isLoggedIn, (req, res, next) => {
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
    .populate('_user')
    .then(thoughts => {
      res.json(thoughts)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// GET Thoughts by Id

router.get('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id
  Thought.findById(id)
    .then(thought => {
      res.json(thought)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// POST Create Thought

router.post('/', isLoggedIn, uploader.single('picture'), (req, res, next) => {
  let fileUrl = (req.file || {}).url

  Thought.create({
    _user: req.user._id,
    _group: req.body._group,
    title: req.body.title,
    quote: req.body.quote,
    book_chapter: req.body.book_chapter,
    book_page: req.body.book_page,
    content: req.body.content,
    titlePictureUrl: fileUrl,
    links: req.body.links,
  })
    .then(thought => {
      Action.create({
        type: 'thought',
        link:
          '/group-detail/' + req.body._group + '/thought-detail/' + thought._id,
        teaser: thought.content.substr(0, 50) + '...',
        _user: req.user,
        _document: thought._id,
        _group: thought._group,
      }).then(action => {
        res.json(thought)
      })
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// DELETE one thought

router.delete('/:id', isLoggedIn, (req, res, next) => {
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
