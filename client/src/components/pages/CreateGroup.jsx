import React, { useState, useEffect } from 'react'
import { Input, Button } from 'reactstrap'
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
        pages: 0,
        year: 0,
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

  // function getSuggestions(value) {
  //   console.log('getSugg Value: ', value)
  //   const inputValue = value
  //     .toString()
  //     .trim()
  //     .toLowerCase()
  //   const inputLength = inputValue.length

  //   return inputLength === 0
  //     ? []
  //     : books.filter(
  //         book => book.title.toLowerCase().slice(0, inputLength) === inputValue
  //       )
  // }

  // const getSuggestionValue = suggestion => suggestion.title

  // const renderSuggestion = suggestion => <div>{suggestion.title}</div>

  // function onSuggestionsFetchRequested(value) {
  //   console.log('fire fetch requested', value)
  //   setStateGroup({
  //     ...stateGroup,
  //     bookTitle: value,
  //     suggestions: getSuggestions(value),
  //   })
  // }

  // function onSuggestionsClearRequested() {
  //   console.log('fire clear requested')
  //   setStateGroup({
  //     ...stateGroup,
  //     suggestions: [],
  //     bookTitle: '',
  //   })
  // }

  // const inputProps = {
  //   placeholder: 'Type a programming language',
  //   name: 'bookTitle',
  //   value: stateGroup.bookTitle,
  //   onChange: e => {
  //     handleChangeGroup(e)
  //   },
  // }

  return (
    <div>
      <div className="App__right__header">
        <MainNavbar title="create a Group" />
      </div>
      <div className="App__right__body container">
        <span className="App__right__circle" />
        {
          // <pre>{JSON.stringify(stateGroup, null, 2)}</pre>
          // <pre>{JSON.stringify(stateBook, null, 2)}</pre>
          // <pre>{JSON.stringify(books, null, 2)}</pre>}
        }

        {/*
        <Autosuggest
          inputProps={inputProps}
          suggestions={stateGroup.suggestions}
          onSuggestionsFetchRequested={value => {
            onSuggestionsFetchRequested(value.value)
          }}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
        />
        */}

        <Input
          className="col-12 col-md-6 offset-md-3 text-center"
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
        {stateGroup._book === 'create' && (
          <div className="m-5">
            <Input
              className="col-12 col-md-6 offset-md-3 text-center"
              type="text"
              name="isbn_10"
              value={stateBook.isbn_10}
              onChange={handleChangeBook}
              placeholder="isbn_10"
            />
            <Input
              className="col-12 col-md-6 offset-md-3 text-center"
              type="text"
              name="isbn_13"
              value={stateBook.isbn_13}
              onChange={handleChangeBook}
              placeholder="isbn_13"
            />
            <Input
              className="col-12 col-md-6 offset-md-3 text-center"
              type="text"
              name="title"
              value={stateBook.title}
              onChange={handleChangeBook}
              placeholder="Book Title"
            />
            <Input
              className="col-12 col-md-6 offset-md-3 text-center"
              type="text"
              name="author"
              value={stateBook.author}
              onChange={handleChangeBook}
              placeholder="Name of Author"
            />
            <Input
              className="col-12 col-md-6 offset-md-3 text-center"
              type="text"
              name="translator"
              value={stateBook.name}
              onChange={handleChangeBook}
              placeholder="Name of Translator"
            />
            <Input
              className="col-12 col-md-6 offset-md-3 text-center"
              type="number"
              name="pages"
              value={stateBook.pages}
              onChange={handleChangeBook}
              placeholder="number of pages"
            />
            <Input
              className="col-12 col-md-6 offset-md-3 text-center"
              type="number"
              name="year"
              value={stateGroup.year}
              onChange={handleChangeBook}
              placeholder="Year of book"
            />
            <Input
              className="col-12 col-md-6 offset-md-3 text-center"
              type="file"
              name="coverPictureUrl"
              value={stateBook.coverPictureUrl}
              onChange={handleChangeBook}
              placeholder="upload a picture"
            />
            <Button
              className="col-12 col-md-6 offset-md-3 text-center"
              onClick={handleSubmitBook}
            >
              Create Book
            </Button>
          </div>
        )}
        <Input
          className="col-12 col-md-6 offset-md-3 text-center"
          required
          type="text"
          name="name"
          value={stateGroup.name}
          onChange={handleChangeGroup}
          placeholder="Give a name to your group"
        />
        <Input
          className="col-12 col-md-6 offset-md-3 text-center"
          required
          type="textarea"
          name="description"
          value={stateGroup.description}
          onChange={handleChangeGroup}
          placeholder="Desacribe your new group"
        />
        <Input
          className="col-12 col-md-6 offset-md-3 text-center"
          type="checkbox"
          name="isPrivate"
          value={stateGroup.isPrivate}
          onChange={handleChangeGroup}
        />
        <Button
          className="col-12 col-md-2 offset-md-5 text-center"
          onClick={handleSubmitGroup}
        >
          Create Group
        </Button>
        <BackButton history={props.history} />
      </div>
    </div>
  )
}
