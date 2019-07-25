const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Book = require('../models/Book')
const Comment = require('../models/Comment')
const Group = require('../models/Group')
const Membership = require('../models/Membership')
const Thought = require('../models/Thought')

const bcryptSalt = 10

require('../configs/database')

let userDocs = [
  new User({
    username: 'beautyAlice',
    email: 'alice@gmail.com',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'nastyBob',
    email: 'bob@gmail.com',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'ingo',
    email: 'ingo@gmail.com',
    password: bcrypt.hashSync('ingo', bcrypt.genSaltSync(bcryptSalt)),
  }),
]

let bookDocs = [
  new Book({
    isbn_10: '0007385617',
    isbn_13: '9780007385614',
    title: 'The Monk Who Sold his Ferrari',
    author: 'Robin Sharma',
    pages: 224,
    year: 2012,
    coverPictureUrl:
      'https://books.google.pt/books/content?id=jeSQNXk4ug8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72QAyxspmcHzr6NkBFZVnEjwmacXdhxDFKGRTk8N2K4gzvUotOMKtG6haOZuxdM0MFi163zylQLKV7NvOytCglH4Q4F8XoVs6h0nooVYdsqpy36-0yFaL5VZCtF2vbvJeLsdnwj',
  }),
  new Book({
    isbn_10: '006245773X',
    isbn_13: '9780062457738',
    title:
      'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life',
    author: 'Mark Manson',
    pages: 224,
    year: 2016,
    coverPictureUrl:
      'https://books.google.pt/books/content?id=yng_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70LzjzCUDmMV97ujNF2LOHEwyM9-0TTSzRXYhbHruCUMIoXyhopk4Mdfqxh98QEivUOD_V52naDEZT9QQl4xO_qwMGXb2u_x3DhVDs6fgUWmL21IfQBpv-WmOIgabKijs-CZb0W',
  }),
  new Book({
    isbn_10: '1386161462',
    isbn_13: '9781386161462',
    title:
      'Javascript For Beginners: Your Guide For Learning Javascript Programming in 24 Hours',
    author: 'John Maldonado',
    year: 2019,
    coverPictureUrl:
      'https://books.google.pt/books/content?id=enaKDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71Hs2yIb5wvycDAgM6jjgh0-EEIC9Bxt3sOCg9GPZIUhKSCuaEMvaLDH4CY44EBh3k3YmHxdGsLt5EK9dU9r3FlQ10Y8U5kNdMY1df2PS-8GYJuEidOKqyhkvJrg2NdYS0VlAwX',
  }),
]

let groupDocs = [
  new Group({
    _book: bookDocs[2]._id,
    name: 'Ironhack Lisbon DevSquad #144',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quidem doloremque fugit doloribus ex deleniti eum dolorum quasi cupiditate velit laboriosam molestias neque distinctio tempora, quas ipsum enim quo harum ut sit error explicabo laborum sequi. Aliquam eaque magnam voluptatem. Voluptate aliquam perspiciatis culpa, fugiat molestias deserunt ut deleniti ad.',
    isPrivate: false,
  }),
  new Group({
    _book: bookDocs[2]._id,
    name: 'Ironhack Madird DevSpuad #12',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quidem doloremque fugit doloribus ex deleniti eum dolorum quasi cupiditate velit laboriosam molestias neque distinctio.',
    isPrivate: false,
  }),
  new Group({
    _book: bookDocs[0]._id,
    name: 'Inspiration for Meditation',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quidem doloremque fugit doloribus ex deleniti eum dolorum quasi cupiditate velit laboriosam molestias neque distinctio tempora, quas ipsum enim quo harum ut sit error explicabo laborum sequi. Aliquam eaque magnam voluptatem.',
    isPrivate: false,
  }),
  new Group({
    _book: bookDocs[1]._id,
    name: 'Livro do Desassogego',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quidem doloremque fugit',
    isPrivate: true,
  }),
]

let membershipDocs = [
  new Membership({
    _user: userDocs[0]._id,
    _gruop: groupDocs[3]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[1]._id,
    _group: groupDocs[2]._id,
    isCreator: true,
  }),
  new Membership({
    _user: userDocs[0]._id,
    _group: groupDocs[0]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    isCreator: false,
  }),
]

let thoughtDocs = [
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[1]._id,
    quote:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, quod.',
    book_chapter: 'IV',
    book_page: 15,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, recusandae.',
    titlePictureUrl:
      'https://cdn.mindful.org/Meditation_Goleman.jpg?q=80&fm=jpg&fit=crop&w=1400&h=875',
    links: [
      'https://www.7mind.de/magazin/meditation-lernen-alles-was-du-als-anfaenger-wissen-musst',
    ],
  }),
  new Thought({
    _user: userDocs[1]._id,
    _group: groupDocs[1]._id,
    title: 'Hello world',
    book_chapter: '14',
    book_page: 220,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, recusandae.',
    titlePictureUrl:
      'https://media.gettyimages.com/photos/rooster-walking-aroun-key-west-picture-id157439916?s=612x612',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    title: 'Look at that amazing quote',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, recusandae.',
    quote:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nobis quisquam eos at eveniet a, harum unde officiis rem suscipit voluptatem nihil modi earum odio enim vitae corrupti molestiae ipsa.',
    book_page: 42,
  }),
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[1]._id,
    title: 'Look at the new website of the author',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, recusandae.',
    links: ['https://www.robinsharma.com/'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    quote:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, quod.',
    book_chapter: 'IV',
    book_page: 15,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, recusandae.',
    titlePictureUrl:
      'https://cdn.mindful.org/Meditation_Goleman.jpg?q=80&fm=jpg&fit=crop&w=1400&h=875',
    links: [
      'https://www.7mind.de/magazin/meditation-lernen-alles-was-du-als-anfaenger-wissen-musst',
    ],
  }),
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[1]._id,
    quote:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, quod.',
    book_chapter: 'IV',
    book_page: 15,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, recusandae.',
    titlePictureUrl:
      'https://cdn.picture-organic-clothing.com/wp-content/uploads/2018/11/banni%C3%A8re-mat-1072x666.jpg',
    links: ['https://www.7mind.de/magazin/achtsame-ideen-fuer-deinen-sommer'],
  }),
]

let commentDocs = [
  new Comment({
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, aut?',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[0]._id,
  }),
  new Comment({
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, aut?',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[1]._id,
  }),
  new Comment({
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, aut?',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[1]._id,
  }),
  new Comment({
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, aut?',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[3]._id,
  }),
  new Comment({
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, aut?',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[2]._id,
  }),
  new Comment({
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, aut?',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[0]._id,
  }),
]

Promise.all([
  User.deleteMany(),
  Book.deleteMany(),
  Membership.deleteMany(),
  Group.deleteMany(),
  Thought.deleteMany(),
  Comment.deleteMany(),
])
  .then(() => {
    console.log(
      'All users, books, memberships, goups, thoughts and comments have been deleted'
    )

    return Promise.all([
      User.create(userDocs),
      Book.create(bookDocs),
      Membership.create(membershipDocs),
      Group.create(groupDocs),
      Thought.create(thoughtDocs),
      Comment.create(commentDocs),
    ])
  })
  .then(() => {
    console.log(`${userDocs.length} users created`)
    console.log(`${bookDocs.length} books created`)
    console.log(`${membershipDocs.length} memberships created`)
    console.log(`${groupDocs.length} groups created`)
    console.log(`${thoughtDocs.length} thoughts created`)
    console.log(`${commentDocs.length} comments created`)

    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
