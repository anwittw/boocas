import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import api from '../../api'

export default function CreateGroup() {
  const [state, setState] = useState({
    _book: '',
    name: '',
    description: '',
    isPrivate: false,
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

  function handleChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setState({
      ...state,
      [e.target.name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    api
      .createGroup(state)
      .then(response => {
        setState({
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
          })
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>Create a new Group</h1>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(books, null, 2)}</pre>} */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="_book">Pick a Book</Label>
          <Input
            type="select"
            name="_book"
            onChange={handleChange}
            value={state._book}
          >
            {books.length !== 0 &&
              books.map((book, i) => (
                <option key={i} value={book.id}>
                  {book.title}
                </option>
              ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="name">Name of the Group</Label>
          <Input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            value={state.description}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="isPrivate">Private Group</Label>
          <Input
            type="checkbox"
            name="isPrivate"
            value={state.isPrivate}
            onChange={handleChange}
          />
        </FormGroup>
        <Button>Create Group</Button>
      </Form>
    </div>
  )
}
