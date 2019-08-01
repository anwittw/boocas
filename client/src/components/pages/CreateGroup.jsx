import React, { useState, useEffect, useContext } from 'react'
import { Input, Button, Container, Col, Row } from 'reactstrap'
import api from '../../api'

// import Autosuggest from 'react-autosuggest'
import MainNavbar from '../MainNavbar'
import BackButton from '../BackButton'
import axios from 'axios'
import AppContext from '../../contexts/AppContext'

export default function CreateGroup(props) {
  const [myGroups, setMyGroups] = useContext(AppContext)
  const [stateGroup, setStateGroup] = useState({
    _book: '',
    name: '',
    description: '',
    isPrivate: false,
    bookTitle: '',
    suggestions: [],
  })

  const [stateBook, setStateBook] = useState({
    isbn_10: '',
    isbn_13: '',
    title: '',
    author: '',
    translator: '',
    pages: 0,
    year: '',
    coverPictureUrl:
      'https://res.cloudinary.com/djbsd3soa/image/upload/c_thumb,w_200,g_face/v1564658294/book-book-pictures/baeolgko3so7jpndagvg.jpg',
    picture: null,
  })

  const [books, setBooks] = useState([])

  useEffect(() => {
    api.getBooks().then(response => {
      setBooks(
        response.map(book => {
          return { id: book._id, title: book.title }
        })
      )
    })
  }, [])

  function handleChangeGroup(e) {
    console.log('OnChange: ', e.target.value)
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setStateGroup({
      ...stateGroup,
      [e.target.name]: value,
    })
  }

  function handleChangeBook(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setStateBook({
      ...stateBook,
      [e.target.name]: value,
    })
  }

  function getInformationForBook(e) {
    e.preventDefault()
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${
          stateBook.isbn_10
        }`
      )
      .then(response => {
        setStateBook({
          isbn_13: response.data.items[0].volumeInfo.industryIdentifiers
            ? response.data.items[0].volumeInfo.industryIdentifiers[1]
                .identifier
            : '',
          title: response.data.items[0].volumeInfo.title,
          author: response.data.items[0].volumeInfo.authors[0],
          pages: response.data.items[0].volumeInfo.pageCount,
          year: response.data.items[0].volumeInfo.publishedDate.substring(0, 4),
          coverPictureUrl: response.data.items[0].volumeInfo.imageLinks
            ? response.data.items[0].volumeInfo.imageLinks.smallThumbnail
            : 'https://res.cloudinary.com/djbsd3soa/image/upload/c_thumb,w_200,g_face/v1564667917/book-book-pictures/hdgcqlueqvpbkicpbol6.jpg',
        })
      })
      .catch(err => console.log(err))
  }

  function handleSubmitGroup(e) {
    e.preventDefault()
    api
      .createGroup(stateGroup)
      .then(response => {
        setStateGroup({
          _book: '',
          name: '',
          description: '',
          isPrivate: '',
        })
        //console.log('Group', response)
        setMyGroups([...myGroups, response])
        api
          .createMembership({ _group: response._id, isCreator: true })
          .then(response => {
            //console.log('Membership', response)
            props.history.push('/group-detail/' + response._group)
          })
      })
      .catch(err => console.log(err))
  }

  function handleSubmitBook(e) {
    e.preventDefault()
    api.createBook(stateBook).then(response => {
      setStateBook({
        isbn_10: '',
        isbn_13: '',
        title: '',
        author: '',
        translator: '',
        pages: '',
        year: '',
        coverPictureUrl: '',
      })
      let id = response._id
      api
        .getBooks()
        .then(response => {
          setBooks(
            response.map(book => {
              return { id: book._id, title: book.title }
            })
          )
        })
        .then(() => {
          setStateGroup({
            ...stateGroup,
            _book: id,
          })
        })
    })
  }

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Create a Group" />
      </div>
      <div className="App__right__body">
        <Container className="mt-5">
          {
            // <pre>{JSON.stringify(stateGroup, null, 2)}</pre>
            // <pre>{JSON.stringify(stateBook, null, 2)}</pre>
            // <pre>{JSON.stringify(books, null, 2)}</pre>
          }
          <Row className="mb-5">
            <Col xs="12" md={{ size: 8, offset: 2 }}>
              <Input
                className="text-center"
                type="select"
                name="_book"
                onChange={handleChangeGroup}
                value={stateGroup._book}
              >
                <option value="">Pick a book!</option>
                <option value="create"> Add a new book</option>
                {books.length !== 0 &&
                  books.map((book, i) => (
                    <option key={i} value={book.id}>
                      {book.title}
                    </option>
                  ))}
              </Input>
            </Col>
          </Row>

          {stateGroup._book === 'create' && (
            <div>
              <Row className="my-3">
                <Col className="mt-3 mt-md-0" md={{ size: 6, offset: 2 }}>
                  <Input
                    className="text-center"
                    type="text"
                    name="isbn_10"
                    value={stateBook.isbn_10}
                    onChange={handleChangeBook}
                    placeholder="search by isbn: 9.../ 3..."
                  />
                </Col>
                <Col xs="12" md={{ size: '2', offset: 8 }}>
                  <Button
                    block
                    className=" text-center"
                    onClick={getInformationForBook}
                  >
                    Search
                  </Button>
                </Col>
              </Row>

              <div>
                <Row className="my-3">
                  <div>
                    <img
                      src={stateBook.coverPictureUrl}
                      alt="coverPictureUrl"
                      className="h-200"
                    />
                  </div>
                </Row>
              </div>

              <Row className="my-3">
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                  <Input
                    className="text-center"
                    type="text"
                    name="title"
                    value={stateBook.title}
                    onChange={handleChangeBook}
                    placeholder="Book Title"
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                  <Input
                    className="text-center"
                    type="text"
                    name="author"
                    value={stateBook.author}
                    onChange={handleChangeBook}
                    placeholder="Name of Author"
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                  <Input
                    className="text-center"
                    type="text"
                    name="coverPictureUrl"
                    value={stateBook.coverPictureUrl}
                    onChange={handleChangeBook}
                    placeholder="URL of Image"
                  />
                </Col>
              </Row>
              {
                // Code if you want to add later a possibility to upload a CoverPicture
                /* <Row className="my-5">
                <Col xs="12" md={{ size: '4', offset: 4 }}>
                  <Input
                    className="text-center"
                    type="file"
                    name="coverPictureUrl"
                    value={stateBook.coverPictureUrl}
                    onChange={handleChangeBook}
                    placeholder="upload a picture"
                  />
                </Col>
              </Row> */
              }
              <Row className="my-3">
                <Col xs="12" md={{ size: '6', offset: 3 }}>
                  <Button
                    block
                    className=" text-center"
                    onClick={handleSubmitBook}
                  >
                    Add Book
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {stateGroup._book ||
            (stateGroup._book === 'create' && (
              <div>
                <Row className="mt-5">
                  <Col xs="12" md={{ size: 4, offset: 2 }}>
                    <Input
                      className="text-center"
                      required
                      type="text"
                      name="name"
                      value={stateGroup.name}
                      onChange={handleChangeGroup}
                      placeholder="Give a name to your group"
                    />
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs="12" md={{ size: 8, offset: 2 }}>
                    <Input
                      className="text-center"
                      required
                      type="textarea"
                      name="description"
                      value={stateGroup.description}
                      onChange={handleChangeGroup}
                      placeholder="Describe your new group"
                    />
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs="12" md={{ size: '4', offset: 4 }}>
                    <div className="my-3">
                      <Input
                        className="text-center block"
                        type="checkbox"
                        name="isPrivate"
                        value={stateGroup.isPrivate}
                        onChange={handleChangeGroup}
                      />
                      <span>Make it a private Group</span>
                    </div>
                  </Col>
                </Row>
                <Row className="my-3 ">
                  <Col xs="12" md={{ size: '3', offset: 3 }}>
                    <Button
                      block
                      className="text-center"
                      onClick={handleSubmitGroup}
                    >
                      Create Group
                    </Button>
                  </Col>
                  <Col className="mt-3 mt-md-0" xs="12" md={{ size: '3' }}>
                    <BackButton history={props.history} />
                  </Col>
                </Row>
              </div>
            ))}
        </Container>
      </div>
    </div>
  )
}
