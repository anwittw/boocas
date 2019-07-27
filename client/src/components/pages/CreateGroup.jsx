import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import api from '../../api'

export default function CreateGroup(props) {
  const [stateGroup, setStateGroup] = useState({
    _book: '',
    name: '',
    description: '',
    isPrivate: false,
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
      .createBook(stateBook)
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
            props.history.push('/group-detail/' + response._id)
          })
      })
      .catch(err => console.log(err))
  }

  function handleSubmitBook(e) {
    e.preventDefault()
    api
      .createGroup(stateGroup)
      .then(response => {
        setStateBook({
          isbn_10: '',
          isbn_13: '',
          title: '',
          author: '',
          translator: '',
          pages: 0,
          year: 0,
          coverPictureUrl: '',
        })
        setStateGroup({
          ...stateGroup,
          _book: response._id,
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="App__right__header">
        <h1>Create a Group</h1>
      </div>
      <div className="App__right__body">
        <span className="App__right__circle" />
        <pre>{JSON.stringify(stateGroup, null, 2)}</pre>
        <pre>{JSON.stringify(stateBook, null, 2)}</pre>
        <pre>{JSON.stringify(books, null, 2)}</pre>}
        <Input
          type="select"
          name="_book"
          onChange={handleChangeGroup}
          value={stateGroup._book}
        >
          <option value="">Pick a book!</option>
          {books.length !== 0 &&
            books.map((book, i) => (
              <option key={i} value={book.id}>
                {book.title}
              </option>
            ))}
          <option value="create"> Create a new book</option>
        </Input>
        {stateGroup._book === 'create' && (
          <div className="border m-5">
            <Input
              type="text"
              name="isbn_10"
              value={stateBook.isbn_10}
              onChange={handleChangeBook}
              placeholder="isbn_10"
            />
            <Input
              type="text"
              name="isbn_13"
              value={stateBook.isbn_13}
              onChange={handleChangeBook}
              placeholder="isbn_13"
            />
            <Input
              type="text"
              name="title"
              value={stateBook.title}
              onChange={handleChangeBook}
              placeholder="Book Title"
            />
            <Input
              type="text"
              name="author"
              value={stateBook.author}
              onChange={handleChangeBook}
              placeholder="Name of Author"
            />
            <Input
              type="text"
              name="translator"
              value={stateBook.name}
              onChange={handleChangeBook}
              placeholder="Name of Translator"
            />
            <Input
              type="number"
              name="pages"
              value={stateBook.pages}
              onChange={handleChangeBook}
              placeholder="number of pages"
            />
            <Input
              type="number"
              name="year"
              value={stateGroup.year}
              onChange={handleChangeBook}
              placeholder="Year of book"
            />
            <Input
              type="file"
              name="coverPictureUrl"
              value={stateBook.coverPictureUrl}
              onChange={handleChangeBook}
              placeholder="upload a picture"
            />
            <Button onClick={handleSubmitBook}>Create Book</Button>
          </div>
        )}
        <Input
          type="text"
          name="name"
          value={stateGroup.name}
          onChange={handleChangeGroup}
          placeholder="Give a name to your group"
        />
        <Input
          type="textarea"
          name="description"
          value={stateGroup.description}
          onChange={handleChangeGroup}
          placeholder="Desacribe your new group"
        />
        <Input
          type="checkbox"
          name="isPrivate"
          value={stateGroup.isPrivate}
          onChange={handleChangeGroup}
        />
        <Button onClick={handleSubmitGroup}>Create Group</Button>
      </div>
    </div>
  )
}
