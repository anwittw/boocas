import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { Input, Button, Container, Row, Col } from 'reactstrap'
import { withRouter } from 'react-router'
import { promises } from 'fs'
import MainNavbar from '../MainNavbar'
import CommentCard from '../CommentCard'
import ThoughtCardDetail from '../ThoughtCardDetail'

function ThoughtDetail(props) {
  let thoughtId = props.match.params.thoughtId

  const [thought, setThought] = useState({
    comments_left: [],
    comments_right: [],
    thought: '',
  })
  const [comment, setComment] = useState({
    content: '',
    _thought: thoughtId,
  })

  function handleChangeComment(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setComment({
      ...comment,
      [e.target.name]: value,
    })
  }

  function handleSubmitComment(e) {
    e.preventDefault()
    api
      .createComment(comment)
      .then(response => {
        setComment({
          ...comment,
          content: '',
        })
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    Promise.all([
      api.getCommentsByThought(thoughtId),
      api.getThought(thoughtId),
    ]).then(([comments, thought]) => {
      setThought({
        comments_left: indexIsOdd(comments),
        comments_right: indexIsEven(comments),
        thought: thought,
      })
    })
  }, [comment])

  function indexIsEven(array) {
    console.log('EVEN')
    return array.filter((element, i) => {
      if (i % 2 === 0) {
        return element
      }
    })
  }

  function indexIsOdd(array) {
    console.log('ODD')
    return array.filter((element, i) => {
      if (i % 2 !== 0) {
        return element
      }
    })
  }

  // window.scrollTo(0, 0)

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Thought Details" />
      </div>

      <div className="App__right__body">
        {
          // <div>
          //   <pre>{JSON.stringify(thought, null, 2)}</pre>
          //   <pre>{JSON.stringify(comment, null, 2)}</pre>
          // </div>
        }
        <Container>
          <Row className="mt-5 mb-5">
            <Col md="3" style={{ fontSize: '14px' }}>
              {thought.comments_left.length > 0 &&
                thought.comments_left.map(comment => (
                  <CommentCard comment={comment} />
                ))}
            </Col>
            <Col md="6">
              <div>
                <Input
                  type="textarea"
                  name="content"
                  value={comment.content}
                  onChange={handleChangeComment}
                  placeholder="Comment"
                />
                <Link
                  style={{
                    fontSize: '15px',
                    textAlign: 'center',
                    marginTop: '-3px',
                    fontStyle: 'oblique',
                  }}
                  className="Button__Shelf"
                  onClick={handleSubmitComment}
                >
                  <strong>Add your Comment</strong>
                </Link>
              </div>
              <div>
                <ThoughtCardDetail
                  title={thought.thought.title}
                  content={thought.thought.content}
                  titlePictureUrl={thought.thought.titlePictureUrl}
                  book_chapter={thought.thought.book_chapter}
                  book_page={thought.thought.book_page}
                />
              </div>
            </Col>
            <Col md="3" style={{ fontSize: '14px' }}>
              {thought.comments_right.length > 0 &&
                thought.comments_right.map(comment => (
                  <CommentCard comment={comment} />
                ))}
            </Col>
          </Row>
        </Container>

        <span className="App__right__circle" />
      </div>
    </div>
  )
}

export default withRouter(ThoughtDetail)
