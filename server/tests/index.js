process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = 'mongodb://localhost/project3-test'

//Require the dev-dependencies
const bcrypt = require('bcrypt')
const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../bin/www')
const Book = require('../models/Book')
const Comment = require('../models/Comment')
const Group = require('../models/Group')
const Membership = require('../models/Membership')
const Thought = require('../models/Thought')
const User = require('../models/User')

const bcryptSalt = 10
chai.should()

let userDocs = [
  new User({
    username: 'alice',
    email: 'alice@gmail.com',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'bob',
    email: 'bob@gmail.com',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
  }),
]

chai.use(chaiHttp)

//Our parent block
describe('MVP Tests', () => {
  beforeEach(done => {
    Promise.all([
      Book.deleteMany(),
      Comment.deleteMany(),
      Group.deleteMany(),
      Membership.deleteMany(),
      Thought.deleteMany(),
      User.deleteMany(),
    ]).then(() => {
      done()
    })
  })
  afterEach(() => {})

  describe('Simple test', () => {
    it('should succeed', done => {
      done()
    })
  })

  describe('POST /api/signup', () => {
    it('should be able to signup', done => {
      chai
        .request(server)
        .post('/api/signup')
        .send({
          username: 'maxence',
          email: 'maxence@ironhack.com',
          password: 'maxence',
        })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})
