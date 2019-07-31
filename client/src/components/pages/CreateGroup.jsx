import React, { useState, useEffect } from 'react'
import { Input, Button, Container, Col, Row } from 'reactstrap'
import api from '../../api'

import Autosuggest from 'react-autosuggest'
import MainNavbar from '../MainNavbar'
import BackButton from '../BackButton'

export default function CreateGroup(props) {
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
    year: 0,
    coverPictureUrl: '',
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
            // <pre>{JSON.stringify(books, null, 2)}</pre>}
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
                <option value="create"> Create a new book</option>
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
                <Col xs="12" md={{ size: 4, offset: 2 }}>
                  <Input
                    className="text-center"
                    type="text"
                    name="isbn_10"
                    value={stateBook.isbn_10}
                    onChange={handleChangeBook}
                    placeholder="isbn_10"
                  />
                </Col>
                <Col xs="12" md={{ size: 4 }}>
                  <Input
                    className="text-center"
                    type="text"
                    name="isbn_13"
                    value={stateBook.isbn_13}
                    onChange={handleChangeBook}
                    placeholder="isbn_13"
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" md={{ size: 4, offset: 2 }}>
                  <Input
                    className="text-center"
                    type="text"
                    name="author"
                    value={stateBook.author}
                    onChange={handleChangeBook}
                    placeholder="Name of Author"
                  />
                </Col>
                <Col xs="12" md={{ size: 4 }}>
                  <Input
                    className="text-center"
                    type="text"
                    name="translator"
                    value={stateBook.name}
                    onChange={handleChangeBook}
                    placeholder="Name of Translator"
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" md={{ size: 4, offset: 2 }}>
                  <Input
                    className="text-center"
                    type="number"
                    name="pages"
                    value={stateBook.pages}
                    onChange={handleChangeBook}
                    placeholder="number of pages"
                  />
                </Col>
                <Col xs="12" md={{ size: 4 }}>
                  <Input
                    className="text-center"
                    type="number"
                    name="year"
                    value={stateGroup.year}
                    onChange={handleChangeBook}
                    placeholder="Year of book"
                  />
                </Col>
              </Row>
              <Row className="my-5">
                <Col xs="12" md={{ size: '4', offset: 4 }}>
                  <div>
                    <Input
                      className="text-center"
                      type="file"
                      name="coverPictureUrl"
                      value={stateBook.coverPictureUrl}
                      onChange={handleChangeBook}
                      placeholder="upload a picture"
                    />
                  </div>
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" md={{ size: '6', offset: 3 }}>
                  <Button
                    block
                    className=" text-center"
                    onClick={handleSubmitBook}
                  >
                    Create Book
                  </Button>
                </Col>
              </Row>
            </div>
          )}
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
              <Button block className="text-center" onClick={handleSubmitGroup}>
                Create Group
              </Button>
            </Col>
            <Col className="mt-3 mt-md-0" xs="12" md={{ size: '3' }}>
              <BackButton history={props.history} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
