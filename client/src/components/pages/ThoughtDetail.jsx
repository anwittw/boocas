import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { Input, Button } from 'reactstrap'
import { withRouter } from 'react-router'
import { promises } from 'fs'
import MainNavbar from '../MainNavbar'

function ThoughtDetail(props) {
  let thoughtId = props.match.params.thoughtId

  const [thought, setThought] = useState('')
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
      setThought({ comments: comments, thought: thought })
    })
  }, [])

  return (
    <div>
      <div className="App__right__header">
        <MainNavbar title="Group Detail" />
        <pre>{JSON.stringify(comment, null, 2)}</pre>
      </div>

      <Input
        type="text"
        name="content"
        value={comment.content}
        onChange={handleChangeComment}
        placeholder="isbn_10"
      />

      <Button onClick={handleSubmitComment}>Create Comment</Button>

      {<pre>{JSON.stringify(thought, null, 2)}</pre>}
      <div className="App__right__body">
        <span className="App__right__circle" />
        )}
      </div>
    </div>
  )
}

export default withRouter(ThoughtDetail)
