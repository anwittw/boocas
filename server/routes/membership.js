const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

const Membership = require('../models/Membership')

// GET memberships or memberships by user

router.get('/', (req, res, next) => {
  let filter = {}
  if (req.query.mine) {
    filter = filter._user = req.user._id
  }
  Membership.find(filter) // .find()  === .find({})
    .populate('_user')
    .populate('_group')
    .then(memberships => {
      res.json(memberships)
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// GET Membership by ID

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Membership.findbyId(id)
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

router.post('/', (req, res, next) => {
  const { user, group, isCreator } = req.body

  Membership.create({ _user: user, _group: group, isCreator: isCreator })
    .then(membership => {
      next({
        message: membership,
      })
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

// DELETE Delete a membership

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Membership.findById(id)
    .then(membership => {
      if (!membership) {
        next({
          status: 404,
          message: `membership with Id: ${id.toString()} not found`,
        })
      }
      if (req.user._id.toString() !== membership._user.toString()) {
        next({
          status: 403,
          message: 'You are not allowed to delete this membership',
        })
      }
      Membership.findByIdAndDelete(id).then(membership =>
        next({
          message: membership,
        })
      )
    })
    .catch(err => {
      next({ status: 400, message: err })
    })
})

module.exports = router
