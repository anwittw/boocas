import React, { useState } from 'react'
import api from '../../api'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

import MainNavbar from '../MainNavbar'
import BackButton from '../BackButton'

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
    uploadData.append('_group', state._group)
    uploadData.append('content', state.content)
    uploadData.append('book_chapter', state.book_chapter)
    uploadData.append('book_page', state.book_page)
    uploadData.append('picture', state.picture)
    uploadData.append('links', state.links)

    console.log(uploadData)
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
          picture: '',
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
        <div className="App__right__header">
          <MainNavbar title="Create a new Thought" />
        </div>
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
        <div className="App__right__body container mt-5 mb-5">
          <span className="App__right__circle" />
          <Form onSubmit={handleSubmit}>
            <FormGroup className="col-12 col-md-6 offset-md-3 text-center">
              <Label className="" for="title">
                Title
              </Label>
              <Input
                type="text"
                name="title"
                value={state.title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="col-12 col-md-6 offset-md-3 text-center">
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                name="content"
                value={state.content}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="col-12 col-md-6 offset-md-3 text-center">
              <Label for="book_chapter">Chapter</Label>
              <Input
                type="text"
                name="book_chapter"
                value={state.book_chapter}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="col-12 col-md-6 offset-md-3 text-center">
              <Label for="book_page">Page</Label>
              <Input
                type="number"
                name="book_page"
                value={state.book_page}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="col-12 col-md-6 offset-md-3 text-center">
              <Label for="picture">Picture</Label>
              <Input type="file" name="picture" onChange={handleFileChange} />
            </FormGroup>
            <FormGroup className="col-12 col-md-6 offset-md-3 text-center">
              <Label for="links">Links</Label>
              <Input
                type="text"
                name="links"
                value={state.links}
                onChange={handleChange}
              />
            </FormGroup>
            <Button className="col-12 col-md-2 offset-md-5 text-center">
              {' '}
              Create Thought
            </Button>
          </Form>
          <BackButton history={props.history} />
        </div>
      </div>
    </div>
  )
}
