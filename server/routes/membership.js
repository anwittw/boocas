const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Membership = require('../models/Membership')
const Action = require('../models/Action')

// GET memberships or memberships by user

router.get('/', isLoggedIn, (req, res, next) => {
  let filter = {}
  if (req.query.mine) {
    filter = { ...filter, _user: req.user._id }
  }
  if (req.query.group) {
    filter = { ...filter, _group: req.query.group }
  }
  Membership.find(filter) // .find()  === .find({})
    .populate('_user')
    .populate({
      path: '_group',
      populate: {
        path: '_book',
      },
    })
    .then(memberships => {
      res.json(memberships)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// GET Membership by ID

router.get('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id
  Membership.findById(id)
    .populate('_user')
    .populate('_group')
    .then(membership => {
      if (!membership) {
        next({
          status: 404,
          message: `membership with Id: ${id.toString()} not found`,
        })
      }
      res.json(membership)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// POST Create a membership

router.post('/', isLoggedIn, (req, res, next) => {
  if (req.body._user) {
    Membership.create({
      _user: req.body._user,
      _group: req.body._group,
      isCreator: req.body.isCreator,
    })
      .then(membership => {
        Action.create({
          type: 'membership',
          link: '/group-detail/' + membership._group,
          teaser:
            membership._user + ' joined the group ' + membership._group + '...',
          _user: membership._user,
          _document: membership._id,
          _group: membership._group,
        }).then(action => {
          res.json(membership)
        })
      })
      .catch(err => {
        next({ status: 400, message: err })
      })
  } else {
    Membership.create({
      _user: req.user._id,
      _group: req.body._group,
      isCreator: req.body.isCreator,
    })
      .then(membership => {
        Action.create({
          type: 'membership',
          link: '/group-detail/' + membership._group,
          teaser:
            membership._user + ' joined the group ' + membership._group + '...',
          _user: membership._user,
          _document: membership._id,
          _group: membership._group,
        }).then(action => {
          res.json(membership)
        })
      })
      .catch(err => {
        next({ status: 400, message: err })
      })
  }
})

// DELETE a membership

router.delete('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id
  Membership.findById(id)
    .then(membership => {
      if (!membership) {
        next({
          status: 404,
          message: `membership with Id: ${id.toString()} not found`,
        })
        return
      }
      if (req.user._id.toString() !== membership._user.toString()) {
        next({
          status: 403,
          message: 'You are not allowed to delete this membership',
        })
        return
      }
      Membership.findByIdAndDelete(id).then(membership =>
        res.json({
          message: 'membership was deleted',
        })
      )
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
