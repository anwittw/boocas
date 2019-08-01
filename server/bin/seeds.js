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
    username: 'andre',
    email: 'andre@gmail.com',
    password: bcrypt.hashSync('andre', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'carlos',
    email: 'carlos@gmail.com',
    password: bcrypt.hashSync('carlos', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'ingo',
    email: 'ingo@gmail.com',
    password: bcrypt.hashSync('ingo', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'maxence',
    email: 'maxence@gmail.com',
    password: bcrypt.hashSync('maxence', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'seb',
    email: 'seb@gmail.com',
    password: bcrypt.hashSync('seb', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'anja',
    email: 'anja@gmail.com',
    password: bcrypt.hashSync('anja', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'giulia',
    email: 'giulia@gmail.com',
    password: bcrypt.hashSync('giulia', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'mariana',
    email: 'mariana@gmail.com',
    password: bcrypt.hashSync('mariana', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'jody',
    email: 'jody@gmail.com',
    password: bcrypt.hashSync('jody', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'sonia',
    email: 'sonia@gmail.com',
    password: bcrypt.hashSync('sonia', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'antonio',
    email: 'antonio@gmail.com',
    password: bcrypt.hashSync('antonio', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'carla',
    email: 'carla@gmail.com',
    password: bcrypt.hashSync('carla', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'guilherme',
    email: 'guilherme@gmail.com',
    password: bcrypt.hashSync('guilherme', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'goncalo',
    email: 'goncalo@gmail.com',
    password: bcrypt.hashSync('goncalo', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'alvaro',
    email: 'alvaro@gmail.com',
    password: bcrypt.hashSync('alvaro', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'luis',
    email: 'luis@gmail.com',
    password: bcrypt.hashSync('luis', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'carmen',
    email: 'carmen@gmail.com',
    password: bcrypt.hashSync('carmen', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'jose',
    email: 'jose@gmail.com',
    password: bcrypt.hashSync('jose', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'munique',
    email: 'munique@gmail.com',
    password: bcrypt.hashSync('munique', bcrypt.genSaltSync(bcryptSalt)),
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
    isbn_10: '0547249640',
    isbn_13: '9780547249643',
    title: '1984',
    author: 'George Orwell',
    pages: 648,
    year: 1983,
    coverPictureUrl:
      'https://kbimages1-a.akamaihd.net/157546c6-2ed4-494d-8584-8250ee5f8792/1200/1200/False/bHPIUc5dhkmjKwMJhoNbhA.jpg',
  }),
  new Book({
    isbn_10: '1782833560',
    isbn_13: '9781782833567',
    title: 'The Book of Disquiet ',
    author: 'Fernando Pessoa',
    pages: 625,
    year: 1933,
    coverPictureUrl:
      'https://s3-ap-southeast-2.amazonaws.com/assets.allenandunwin.com/images/small/9781781258644.jpg',
  }),
  new Book({
    isbn_10: '0141906952',
    isbn_13: '9780141906959',
    title: 'Faust',
    author: 'J. W. Goethe',
    pages: 240,
    year: 2005,
    coverPictureUrl:
      'https://www.penguin.co.uk/content/dam/prh/books/354/35458/9780140449013.jpg.transform/PRHDesktopWide_small/image.jpg',
  }),
  new Book({
    isbn_10: '0374718709',
    isbn_13: '9780374718701',
    title: 'The Flame',
    author: 'Leonard Cohen',
    pages: 288,
    year: 1953,
    coverPictureUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81yg3TFoj7L.jpg',
  }),
  new Book({
    isbn_10: '1101972351',
    isbn_13: '9781101972359',
    title: "Swann's Way",
    author: 'Marcel Proust',
    pages: 496,
    year: 2015,
    coverPictureUrl:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1452956236l/12749._SY475_.jpg',
  }),
  new Book({
    isbn_10: '1465327894',
    isbn_13: '9781465327895',
    title: 'Illuminations',
    author: 'Arthur Rimbaud',
    pages: 113,
    year: 2010,
    coverPictureUrl:
      'https://images-na.ssl-images-amazon.com/images/I/31ZSTdtgjLL._SX326_BO1,204,203,200_.jpg',
  }),
  new Book({
    isbn_10: '8075839854',
    isbn_13: '9788075839855',
    title: 'Ulysses',
    author: 'James Joyce',
    pages: 900,
    year: 2017,
    coverPictureUrl:
      'https://img.wook.pt/images/ulisses-james-joyce/MXwxNTMyMjUyOHwxMDgxMzc3OXwxMzg1NDI0MDAwMDAw/250x',
  }),
  new Book({
    isbn_10: '1101911115',
    isbn_13: '9781101911112',
    title: 'Love in the Time of Cholera',
    author: 'Gabriel García Márquez',
    pages: 368,
    year: 2014,
    coverPictureUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41%2BHorgT4YL._SX322_BO1,204,203,200_.jpg',
  }),
  new Book({
    isbn_10: '1101870141',
    isbn_13: '9781101870143',
    title: 'Hopscotch',
    author: 'Julio Cortazar',
    pages: 576,
    year: 2015,
    coverPictureUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51dSikOML5L._SX320_BO1,204,203,200_.jpg',
  }),
  new Book({
    isbn_10: '1509806474',
    isbn_13: '9781509806478',
    title: 'My German Brother',
    author: 'Chico Buarque',
    pages: 145,
    year: 2018,
    coverPictureUrl:
      'https://panmacmillanapi.blob.core.windows.net/pmapi/e12a8195-4610-4b2d-fa9f-08d58e45775c/editions/bdc6a6d1-e273-49ff-2a97-08d5fd71ebbb/original_400_600.jpg',
  }),
  new Book({
    isbn_10: '0679643508',
    isbn_13: '9780679643500',
    title: 'Collected Poems',
    author: 'W. H. Auden',
    pages: 928,
    year: 2007,
    coverPictureUrl:
      'https://images.penguinrandomhouse.com/cover/9780679643500',
  }),
  new Book({
    isbn_10: '0802138136',
    isbn_13: '9780802138132',
    title: 'The Natural Order of Things',
    author: 'António Lobo Antunes',
    pages: 298,
    year: 2001,
    coverPictureUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51Y1C9RR2DL._SX310_BO1,204,203,200_.jpg',
  }),
  new Book({
    isbn_10: '1438432763',
    isbn_13: '9781438432762',
    title: 'Being and Time',
    author: 'Martin Heidegger',
    pages: 482,
    year: 2010,
    coverPictureUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41QXF2u4fZL._SX331_BO1,204,203,200_.jpg',
  }),
  new Book({
    isbn_10: '0375724745',
    isbn_13: '9780375724749',
    title: 'Naomi',
    author: 'Junichirō Tanizaki',
    pages: 237,
    year: 2001,
    coverPictureUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81rt1HxNXiL.jpg',
  }),
  new Book({
    isbn_10: '0226965325',
    isbn_13: '9780226965321',
    title: 'Mishima, Ou, La Vision Du Vide',
    author: 'Marguerite Yourcenar',
    pages: 151,
    year: 1970,
    coverPictureUrl:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328871531l/62813.jpg',
  }),
]

let groupDocs = [
  new Group({
    _book: bookDocs[14]._id,
    name: 'Being and Time discussion',
    description:
      'I try to summarise the part of the book that leads up to and includes dealing with Heidegger’s response to tradional problems in the philosophy of science: Sceptism, Realism/Idealism and Truth. I do not attempt to summarise the more existential concerns such as Anxiety, Death and Self-ownership.',
    isPrivate: true,
  }),
  new Group({
    _book: bookDocs[11]._id,
    name: 'My German Brother discussion',
    description:
      'Is a fascinating, shape-shifting piece of autofiction. Ciccio, the protagonist and Buarque’s alter-ego, is the pampered son of a journalist and bibliophile, Sergio Buarque de Holanda (who shares a name and occupation with the author’s real father) and his Italian wife, Assunta (who does not).',
    isPrivate: false,
  }),
  new Group({
    _book: bookDocs[5]._id,
    name: "Cohen's Flame discussion",
    description:
      'The book is illustrated by Cohen’s bold, pen-and-ink self-portraits. One is struck by how little his harrowed face changes: pouchy cheeks, downturned mouth, tragic jowl. But the captions that go with the pictures vary constantly: sweet’n’sour.',
    isPrivate: false,
  }),
  new Group({
    _book: bookDocs[15]._id,
    name: "Tanizaki's Naomi discussion",
    description:
      'Narrated in the first person by the protagonist, a salaryman named Jōji, the novel follows his attempt to groom a Eurasian-looking girl, the titular Naomi, to be a Westernized woman. Naomi is a significant work in its comic depiction of Japanese culture of the era and its fascination with the West.',
    isPrivate: true,
  }),
]

let membershipDocs = [
  new Membership({
    _user: userDocs[0]._id,
    _group: groupDocs[0]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[1]._id,
    _group: groupDocs[0]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[2]._id,
    _group: groupDocs[0]._id,
    isCreator: true,
  }),
  new Membership({
    _user: userDocs[0]._id,
    _group: groupDocs[1]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[1]._id,
    _group: groupDocs[1]._id,
    isCreator: true,
  }),
  new Membership({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[0]._id,
    _group: groupDocs[2]._id,
    isCreator: true,
  }),
  new Membership({
    _user: userDocs[1]._id,
    _group: groupDocs[2]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[2]._id,
    _group: groupDocs[2]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[0]._id,
    _group: groupDocs[3]._id,
    isCreator: true,
  }),
  new Membership({
    _user: userDocs[2]._id,
    _group: groupDocs[3]._id,
    isCreator: false,
  }),
]

let thoughtDocs = [
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[1]._id,
    title: 'Foggy florest',
    book_chapter: '12',
    book_page: 15,
    content:
      'Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1462717585237-7fafe19c5448?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: [
      'https://www.7mind.de/magazin/meditation-lernen-alles-was-du-als-anfaenger-wissen-musst',
    ],
  }),
  new Thought({
    _user: userDocs[1]._id,
    _group: groupDocs[1]._id,
    title: 'Lake hoods',
    book_chapter: 'IV',
    book_page: 220,
    content:
      'Are own design entire former get should. Advantages boisterous day excellence boy. Out between our two waiting wishing. Pursuit he he garrets greater towards amiable so placing. Nothing off how norland delight. Abode shy shade she hours forth its use. Up whole of fancy ye quiet do. Justice fortune no to is if winding morning forming. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1562386130-926081dc4fbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    title: 'Red walks',
    book_chapter: 'IV',
    book_page: 220,
    content:
      'He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1462842349122-2982a4d79c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[1]._id,
    title: 'Contrast thought',
    book_chapter: '2',
    book_page: 89,
    content:
      'Respect forming clothes do in he. Course so piqued no an by appear. Themselves reasonable pianoforte so motionless he as difficulty be. Abode way begin ham there power whole. Do unpleasing indulgence impossible to conviction. Suppose neither evident welcome it at do civilly uncivil. Sing tall much you get nor. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1559160581-44bd4222d397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    title: 'Desert clouds',
    book_chapter: '7',
    book_page: 343,
    content:
      'He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[1]._id,
    title: 'White winds',
    book_chapter: '12',
    book_page: 223,
    content:
      'Evening do forming observe spirits is in. Country hearted be of justice sending. On so they as with room cold ye. Be call four my went mean. Celebrated if remarkably especially an. Going eat set she books found met aware.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1550856015-de3a3956c67d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
]

let commentDocs = [
  new Comment({
    content:
      'Six started far placing saw respect females old. Civilly why how end viewing attempt related enquire visitor.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[0]._id,
  }),
  new Comment({
    content:
      'Moments its musical age explain. But extremity sex now education concluded earnestly her continual.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[1]._id,
  }),
  new Comment({
    content:
      'Age sold some full like rich new. Amounted repeated as believed in confined juvenile.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[1]._id,
  }),
  new Comment({
    content: 'You disposal strongly quitting his endeavor two settling him.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[3]._id,
  }),
  new Comment({
    content:
      'Carriage quitting securing be appetite it declared. High eyes kept so busy feel call in.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[2]._id,
  }),
  new Comment({
    content:
      'Believing neglected so so allowance existence departure in. In design active temper be uneasy.',
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
