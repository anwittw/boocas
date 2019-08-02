import React from 'react'
import { withRouter } from 'react-router'

import api from './../api'
import Circle from './Circle'

import Moment from 'react-moment'

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  lastWeek: '[last] dddd [at] LT',
  sameElse: 'L',
}

function CommentCard(props) {
  let myId = api.getUserId()

  function checkForCreator(prop) {
    try {
      return myId === prop.toString()
    } catch (err) {
      return false
    }
  }

  function deleteComment(id, e) {
    e.preventDefault()
    api.deleteComment(id).then(comment => {
      console.log(comment)
      props.refresh()
    })
  }

  console.log(props)
  return (
    <div>
      <div className="card mb-3" style={{ backgroundColor: props.background }}>
        <div className="card-body pb-2">
          <p className="card-text">{props.comment.content}</p>
          <div className="card-text d-flex">
            {checkForCreator(props.comment._user._id) && (
              <div style={{ zIndex: 1 }} className=" mr-3">
                <Circle
                  size="xsmall"
                  color="success"
                  onClick={e => deleteComment(props.comment._id, e)}
                  text="X"
                />
              </div>
            )}
            <div>
              <small className="text-muted" style={{ fontSize: '9.5px' }}>
                created by {props.comment._user.username},
                <Moment calendar={calendarStrings}>
                  {props.comment.created_at}
                </Moment>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(CommentCard)
