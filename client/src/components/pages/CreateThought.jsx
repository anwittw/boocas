import React, { useState } from 'react'
import api from '../../api'
import { Form, FormGroup, Input, Button, Container, Row, Col } from 'reactstrap'

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
        <div className="App__right__header" style={{ padding: '15px 30px' }}>
          <MainNavbar title="Create a new Thought" />
        </div>
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
        <div className="App__right__body mt-5 mb-5">
          <Container>
            <Form onSubmit={handleSubmit}>
              <Row className="my-3">
                <Col xs="12" md={{ size: 4, offset: 2 }}>
                  <FormGroup className=" text-center">
                    <Input
                      placeholder="title"
                      type="text"
                      name="title"
                      value={state.title}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                  <FormGroup className="text-center">
                    <Input
                      placeholder="Place your thought here!"
                      type="textarea"
                      name="content"
                      value={state.content}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" md={{ size: 4, offset: 2 }}>
                  <FormGroup className="text-center">
                    <Input
                      placeholder="chapter"
                      type="text"
                      name="book_chapter"
                      value={state.book_chapter}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md={{ size: 4 }}>
                  <FormGroup className="text-center">
                    <Input
                      placeholder="page"
                      type="number"
                      name="book_page"
                      value={state.book_page}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="my-5">
                <Col xs="12" md={{ size: '4', offset: 4 }}>
                  <FormGroup className="text-center">
                    <Input
                      type="file"
                      name="picture"
                      onChange={handleFileChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                  <FormGroup className="text-center">
                    <Input
                      placeholder="add links"
                      type="text"
                      name="links"
                      value={state.links}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="my-3 ">
                <Col xs="12" md={{ size: '3', offset: 3 }}>
                  <Button className="text-center"> Create Thought</Button>
                </Col>
                <Col className="mt-3 mt-md-0" xs="12" md={{ size: '3' }}>
                  <BackButton history={props.history} />
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  )
}
