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
  new Group({
    _book: bookDocs[6]._id,
    name: "Proust Swann's discussion",
    description:
      'The famous opening paragraphs of Swann’s Way, in which the narrator describes his habit of going to bed early as a child, typify Proust’s ability to mine insight from apparently insignificant events. As the narrator attempts to understand the workings of his own consciousness as he falls asleep reading, he makes comparisons and creates images that give body and force to his philosophizing.',
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
  new Membership({
    _user: userDocs[0]._id,
    _group: groupDocs[4]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[2]._id,
    _group: groupDocs[4]._id,
    isCreator: false,
  }),
  new Membership({
    _user: userDocs[1]._id,
    _group: groupDocs[4]._id,
    isCreator: true,
  }),
]

let thoughtDocs = [
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[0]._id,
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
    _group: groupDocs[0]._id,
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
    _group: groupDocs[0]._id,
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
    _group: groupDocs[0]._id,
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
    _user: userDocs[1]._id,
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
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    title: 'Curves',
    book_chapter: '5',
    book_page: 23,
    content:
      'Ye to misery wisdom plenty polite to as. Prepared interest proposal it he exercise. My wishing an in attempt ferrars. Visited eat you why service looking engaged. At place no walls hopes rooms fully in. Roof hope shy tore leaf joy paid boy.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1564503868236-059dc49688b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[1]._id,
    title: 'Night shifts',
    book_chapter: '7',
    book_page: 223,
    content:
      'Offered say visited elderly and. Waited period are played family man formed. He ye body or made on pain part meet. You one delay nor begin our folly abode.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1562263588-35193ae8ecbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[1]._id,
    _group: groupDocs[2]._id,
    title: 'Leaf them',
    book_chapter: '9',
    book_page: 523,
    content:
      'To shewing another demands to. Marianne property cheerful informed at striking at. Clothes parlors however by cottage on. In views it or meant drift to.',
    titlePictureUrl:
      'https://images.unsplash.com/uploads/1411040661312f50ec8e2/ded9d54e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[2]._id,
    title: 'Leaf them',
    book_chapter: '2',
    book_page: 35,
    content:
      'Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1449709861192-5fbaa595db43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[2]._id,
    title: 'Water flush',
    book_chapter: '4',
    book_page: 55,
    content:
      'Friendship contrasted solicitude insipidity in introduced literature it. He seemed denote except as oppose do spring my. Between any may mention evening age shortly can ability regular. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1449709861192-5fbaa595db43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[1]._id,
    _group: groupDocs[2]._id,
    title: 'Bubbles',
    book_chapter: '5',
    book_page: 65,
    content:
      'Friendship contrasted solicitude insipidity in introduced literature it. He seemed denote except as oppose do spring my. Between any may mention evening age shortly can ability regular. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1438986710423-1bf13038bc14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[3]._id,
    title: 'Bubbles',
    book_chapter: '6',
    book_page: 75,
    content:
      'Conveying or northward offending admitting perfectly my. Colonel gravity get thought fat smiling add but. Wonder twenty hunted and put income set desire expect. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1486252904492-db70957113f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[3]._id,
    title: 'Circular',
    book_chapter: '7',
    book_page: 87,
    content:
      'Am cottage calling my is mistake cousins talking up. Interested especially do impression he unpleasant travelling excellence. All few our knew time done draw ask. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1559762759-d4dddb38c2a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[1]._id,
    _group: groupDocs[3]._id,
    title: 'Dunes',
    book_chapter: 'V',
    book_page: 342,
    content:
      'But why smiling man her imagine married. Chiefly can man her out believe manners cottage colonel unknown.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1559867243-edf5915deaa7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    title: 'Drops',
    book_chapter: '8',
    book_page: 142,
    content:
      'Particular unaffected projection sentiments no my. Music marry as at cause party worth weeks. Saw how marianne graceful dissuade new outlived prospect followed. Uneasy no settle whence nature narrow in afraid.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1556834234-ff0f846f83cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[0]._id,
    _group: groupDocs[4]._id,
    title: 'White Balls',
    book_chapter: '3',
    book_page: 42,
    content:
      'Able an hope of body. Any nay shyness article matters own removal nothing his forming. Gay own additions education satisfied the perpetual. If he cause manor happy. Without farther she exposed saw man led.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1557128928-66e3009291b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[1]._id,
    _group: groupDocs[4]._id,
    title: 'Fields',
    book_chapter: '7',
    book_page: 234,
    content:
      'On no twenty spring of in esteem spirit likely estate. Continue new you declared differed learning bringing honoured. At mean mind so upon they rent am walk. Shortly am waiting inhabit smiling he chiefly of in. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1557445796-184d83fc49b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[4]._id,
    title: 'Sands',
    book_chapter: '8',
    book_page: 344,
    content:
      'OLain tore time gone him his dear sure. Fat decisively estimating affronting assistance not. Resolve pursuit regular so calling me. West he plan girl been my then up no. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1557505983-1649ce0ba3b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[1]._id,
    _group: groupDocs[4]._id,
    title: 'Stripes',
    book_chapter: '2',
    book_page: 44,
    content:
      'Arrived totally in as between private. Favour of so as on pretty though elinor direct. Reasonable estimating be alteration we themselves entreaties me of reasonably.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1547068276-269a9c4517bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[0]._id,
    title: 'Picos',
    book_chapter: '3',
    book_page: 34,
    content:
      'Shot what able cold new the see hold. Friendly as an betrayed formerly he. Morning because as to society behaved moments.',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1519607811513-d734618713bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    links: ['https://onezero.medium.com/in-defense-of-normal-2b70172dd2b7'],
  }),
  new Thought({
    _user: userDocs[2]._id,
    _group: groupDocs[1]._id,
    title: 'Picos',
    book_chapter: '5',
    book_page: 84,
    content:
      'Up unpacked friendly ecstatic so possible humoured do. Ample end might folly quiet one set spoke her. We no am former valley assure. Four need spot ye said we find mile. ',
    titlePictureUrl:
      'https://images.unsplash.com/photo-1555946228-d5cd5a1f6719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
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
    _thought: thoughtDocs[0]._id,
  }),
  new Comment({
    content:
      'Age sold some full like rich new. Amounted repeated as believed in confined juvenile.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[0]._id,
  }),
  new Comment({
    content: 'You disposal strongly quitting his endeavor two settling him.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[1]._id,
  }),
  new Comment({
    content:
      'Carriage quitting securing be appetite it declared. High eyes kept so busy feel call in.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[1]._id,
  }),
  new Comment({
    content:
      'Believing neglected so so allowance existence departure in. In design active temper be uneasy.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[1]._id,
  }),
  new Comment({
    content:
      'Prit pois qui les pres coin long. Prisonnier ordonnance tristement ecouterent en artilleurs oh. Ai deja donc ne vert.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[1]._id,
  }),
  new Comment({
    content:
      'Construits bon descendons bouquetins evidemment prisonnier oui peu nos. Fils elle mene on ah ca en rues voix.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[2]._id,
  }),
  new Comment({
    content:
      'Ii mamelons va sa precieux couchent fondrait oh trouvent. Roche moins salle creve tenez par une vit metal.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[2]._id,
  }),
  new Comment({
    content:
      'Les ouvrent prefere jet relatif. Tu canons la he vasque carres ii. Ras pouvaient souvenirs des distribua fer vif conquerir.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[2]._id,
  }),
  new Comment({
    content:
      'Pu cervelle recupera songeant au il arrivons. Moi mais sait cent toi moi air bete ruer. Mene ton toi six peut dieu cris long.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[3]._id,
  }),
  new Comment({
    content:
      'Feu philippe pressent nez trahison. Primeveres il on de mendiaient ca imprudente artilleurs indulgence. Flottent il avancent amertume si dressait treillis.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[3]._id,
  }),
  new Comment({
    content:
      'On va mutuel dormir ruches baiser va de. Pretends attentif embrassa en sa relevent. Sa tendons au eu progres laissez. Eclaire jeu toi six survint colonel fureurs.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[3]._id,
  }),
  new Comment({
    content:
      'Ah toute un luire style point guere ah. Rien afin rit bois murs ton tres ras. Couleur dur cheveux meurtre attendu accourt exagere roc. Dit ces kolbacks susciter six bourreau ici. ',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[0]._id,
  }),
  new Comment({
    content:
      'Halboffene im zueinander du grundstuck verstehsts schuchtern vertreiben mi. Da verrichtet erkundigte ri te begleitete ja. La mundart ob stillen du konnten gelegen gewesen niemand. ',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[3]._id,
  }),
  new Comment({
    content:
      'Grasplatz verstehen geschickt bettstatt handwerke nur alt wichszeug. Bescheiden um knabenhaft begleitete grashalden angenommen an ja. Pa pa uberall hinuber offenen zu mu fremder. Ding wand hier des als ohne dies kerl.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[4]._id,
  }),
  new Comment({
    content:
      'In la ausdenken fu ertastete sorglosen am filzhutes schwemmen. Im vollends hinabsah gebogene funkelte du en irgendwo. Als vor sagst ferne ihn kinde spiel durch. ',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[5]._id,
  }),
  new Comment({
    content:
      'Lieb tust ubel gar alt froh. Harmlos kleines offnung da heiland in spiegel anderen la wu. Sah geheimnis schonheit furchtete gar magdebett tanzmusik zufrieden.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[5]._id,
  }),
  new Comment({
    content:
      'So zaunpfahle mi neidgefuhl em vertreiben wo gesprachig angenommen. Du em paar muhe in so doch. In es frauen te kunste kurios zu.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[5]._id,
  }),
  new Comment({
    content:
      'Eben drei es frau halt klar im ichs. Lang hast seit oben tod ein zehn tag. Te se tadellos schaffte befehlen. Verweilen bedeckten bei ihr flanierte kindliche.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[6]._id,
  }),
  new Comment({
    content:
      'La ob storen an deinen am sachen. Doppelte um da am spateren verlogen gekommen achtzehn blaulich. Bessern dir unrecht zweimal ist. Ab sahen es drang ihnen junge alles. ',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[6]._id,
  }),
  new Comment({
    content:
      'So prachtig ri da gesichts betrubte ubrigens an erzahlen. Seiet etwas davon ihnen hoher ins hei gut ferne. Stieg bekam gluck bi indes danke stamm je.  ',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[7]._id,
  }),
  new Comment({
    content:
      'Diese rasch um jahre ja lagen es du sitte. Winter freute weg wei konnen burger vielen. War hemdarmel liebevoll verharrte das sorglosen.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[7]._id,
  }),
  new Comment({
    content:
      'Labsal herein storen halten bilder die mir. Um gerberei launigen mi hinabsah pa gekommen entgegen wo. Gesprachig sonderling auskleiden in vormittags em he je zaunpfahle.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[8]._id,
  }),
  new Comment({
    content:
      'Zahne wu horst dabei ei deine kenne ab he tisch. So brachte dunklen drunten gewohnt richtig eigenes da da. Ubers vater er wills herrn se gluck ihrer es.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[8],
    content:
      'Dahin gutes ob an ja riefe woher wovon. Hinabsah ein bei neu tor trostlos wirklich lampchen. Ei vorwarts brauchen wo freundes spielend la.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[9]._id,
  }),
  new Comment({
    content:
      'Art bodenlosen verdrossen lattenzaun neu vergnugter brotkugeln vielleicht. Wo meinte in so sterne kleine wurden er.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[9]._id,
  }),
  new Comment({
    content:
      'Parrebbe scioglie che consunta conservo fra medesimo ami chiamata. Entrambi tremante so ho annunzia qualcuno promessa va mediocre. ',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[10]._id,
  }),
  new Comment({
    content:
      'Cuscini ben delirio cui lontana piacque scavata compiva. Ho tutelare sfolgora da seguente. Senz una ieri ama dara suoi dal fede tuoi. ',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[10]._id,
  }),
  new Comment({
    content:
      'Rinunzia guardato crudelta pensiero mantenga da fu. Apparire raccogli potrebbe ama sofferma mai tuttavia volgersi ape nel. Compita una braccio sul inganna ali fallano partita.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[10]._id,
  }),
  new Comment({
    content:
      'Primavera ami serravano sui poi frenetico liberarli. Limpida vi ardente ve su addensa. Buona tempo vento ha se siedi.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[11]._id,
  }),
  new Comment({
    content:
      'Era esistenza noi altissimo guardando profumato. Ricordarmi meraviglia da fu aspettando ho sgomentato un villanella. Trovo fondo senti ti in muove. ',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[11]._id,
  }),
  new Comment({
    content:
      'Amo amai poi muto riva nel noi. Nel lui opaco non fende anime occhi voi cerca. Ed ansiosa mattina ah ai ragione ed assunto.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[12]._id,
  }),
  new Comment({
    content:
      'Una oro fanciullo chiederai dai riconosco sublimate. Tratto contro volevo hai lui cumulo rapiva sta trarlo. Sia ama impeto allora divino presto statue.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[12]._id,
  }),
  new Comment({
    content:
      'Tappeti nessuno fresche da so la ne. Un piedi denti te gemma le. Rifletti di nascosta ritrovar di persiano rimanevi su assoluta ch.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[12]._id,
  }),
  new Comment({
    content:
      'Mai pensa ami passa chi scese. Infine all mostro lavoro ama qui sta dietro laggiu. Riapparve sui tristezza oro gia essendosi trasporta.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[12]._id,
  }),
  new Comment({
    content:
      'Quel cave or ah il se lega. Sepolte mettere materia tremare saprete ai ex ad faville. ',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[13]._id,
  }),
  new Comment({
    content:
      'Mutato stanca mentre ancora corano sei noi. Lo continua vivevano tu navigato va promessa sommersa vi. Partissero appartiene raccontero el fatalmente ve su di riprodurre.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[14]._id,
  }),
  new Comment({
    content:
      'Coraggio una persiano amo del vorresti piangere cercarla. Ribollisse raccontero sii animazione aspettando misteriosa pel ore.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[14]._id,
  }),
  new Comment({
    content:
      'Vero omai al tair dall rado tu essa. Pensavo davanti poi volutta sai chi sollevi. Vale fu cose vite me atto riso.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[14]._id,
  }),
  new Comment({
    content:
      'Te deposti da bossolo esitava le ragione tenendo lo. Raccontava ritroverai meraviglia cio impazienza ero visitatore inespresso. Ad stagione ambascia affinita me ve ciascuno al troverai. ',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[14]._id,
  }),
  new Comment({
    content:
      ' 復讐者」. 復讐者」 . 第八章 第六章 第二章 第五章. 復讐者」. 第五章 第十章 第四章 第三章 第七章 第二章. 第七章 第四章 第五章 第八章. 復讐者」. 復讐者」.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[15]._id,
  }),
  new Comment({
    content:
      '復讐者」.復讐者」 伯母さん .伯母さん 復讐者」. 第十九章 第十一章 第十七章 第十八章 第十二章 第十六章. .復讐者」 伯母さん . ',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[15]._id,
  }),
  new Comment({
    content:
      '復讐者」. 復讐者」. 第十四章 第十六章 第十九章 第十八章 第十三章 第十七章. 復讐者」 伯母さん. 第十三章 第十一章 第十四章 第十九章. 第十九章 第十五章 第十三章 第十七章 第十一章 第十 ',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[15]._id,
  }),
  new Comment({
    content:
      ' 復讐者」. 第十三章 第十八章 第十二章 手配書 第十一章. 第六章 第八章 第十章. 第十章 第二章 第六章 第九章 第三章 第五章. 復讐者」 伯母さん. 第八章 第七章 第九章 第三章 第五章.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[15]._id,
  }),
  new Comment({
    content:
      ' 復讐者」. 第六章 第四章 第八章 第三章 第九章 第二章. 第七章 第九章 第八章 第六章 第十章. 第十三章 第十六章 第十五章 第十七章 第十八章. 復讐者」. 復讐者」.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[16]._id,
  }),
  new Comment({
    content:
      '  復讐者」. 第十八章 第十六章 第十三章 第十九章 第十七章 手配書. 復讐者」 .',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[16]._id,
  }),
  new Comment({
    content:
      'Little afraid its eat looked now. Very ye lady girl them good me make. It hardly cousin me always. An shortly village is raising we shewing replied. ',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[17]._id,
  }),
  new Comment({
    content:
      'Do in laughter securing smallest sensible no mr hastened. As perhaps proceed in in brandon of limited unknown greatly.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[17]._id,
  }),
  new Comment({
    content:
      'Resolution possession discovered surrounded advantages has but few add. Yet walls times spoil put. Be it reserved contempt rendered smallest.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[17]._id,
  }),
  new Comment({
    content:
      'Loud wish made on is am as hard. Court so avoid in plate hence. Of received mr breeding concerns peculiar securing landlord. Spot to many it four bred soon well to.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[18]._id,
  }),
  new Comment({
    content:
      'Six started far placing saw respect females old. Civilly why how end viewing attempt related enquire visitor.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[18]._id,
  }),
  new Comment({
    content:
      'Moments its musical age explain. But extremity sex now education concluded earnestly her continual.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[18]._id,
  }),
  new Comment({
    content:
      'Age sold some full like rich new. Amounted repeated as believed in confined juvenile.',
    _user: userDocs[0]._id,
    _thought: thoughtDocs[19]._id,
  }),
  new Comment({
    content: 'You disposal strongly quitting his endeavor two settling him.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[19]._id,
  }),
  new Comment({
    content: 'You disposal strongly quitting his endeavor two settling him.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[20]._id,
  }),
  new Comment({
    content:
      'Carriage quitting securing be appetite it declared. High eyes kept so busy feel call in.',
    _user: userDocs[1]._id,
    _thought: thoughtDocs[20]._id,
  }),
  new Comment({
    content:
      'Believing neglected so so allowance existence departure in. In design active temper be uneasy.',
    _user: userDocs[2]._id,
    _thought: thoughtDocs[20]._id,
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
