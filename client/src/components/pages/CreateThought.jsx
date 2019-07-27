import React, { useState } from 'react'
import api from '../../api'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default function CreateThought(props) {
  let groupId = props.match.params.groupId

  const [state, setState] = useState({
    _group: groupId,
    title: '',
    content: '',
    book_chapter: '',
    book_page: '',
    picture: null,
    links: '',
    quote: '',
  })

  function handleChange(e) {
    let value = e.target.value

    setState({
      ...state,
      [e.target.name]: value,
    })
  }

  function handleFileChange(e) {
    setState({
      ...state,
      picture: e.target.files[0],
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // To send information with "form-data" (like in Postman)
    const uploadData = new FormData()
    uploadData.append('title', state.title)
    uploadData.append('content', state.content)
    uploadData.append('book_chapter', state.book_chapter)
    uploadData.append('book_page', state.book_page)
    uploadData.append('picture', state.picture)
    uploadData.append('links', state.links)

    api
      .createThought(uploadData)
      .then(createdThought => {
        setState({
          _user: '',
          _group: groupId,
          title: '',
          quote: '',
          book_chapter: '',
          book_page: '',
          content: '',
          picture: null,
          links: '',
        })

        //! Redirect the user to another page
        console.log(createdThought)

        props.history.push('/group-detail/' + groupId)
      })
      .catch(err => {
        console.log('Error while creating the Thought: ', err)
      })
  }

  return (
    <div>
      <div>
        <h1>Create a new Thought</h1>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="content">Content</Label>
            <Input
              type="textarea"
              name="content"
              value={state.content}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="book_chapter">Chapter</Label>
            <Input
              type="text"
              name="book_chapter"
              value={state.book_chapter}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="book_page">Page</Label>
            <Input
              type="number"
              name="book_page"
              value={state.book_page}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="picture">Picture</Label>
            <Input type="file" name="picture" onChange={handleFileChange} />
          </FormGroup>
          <FormGroup>
            <Label for="links">Links</Label>
            <Input
              type="text"
              name="links"
              value={state.links}
              onChange={handleChange}
            />
          </FormGroup>
          <Button> Create Thought</Button>
        </Form>
      </div>
    </div>
  )
}
