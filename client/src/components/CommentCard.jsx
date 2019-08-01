import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  lastWeek: '[last] dddd [at] LT',
  sameElse: 'L',
}

function CommentCard(props) {
  console.log(props)
  return (
    <div>
      <div class="card mb-3">
        <div class="card-body pb-2">
          <p class="card-text">{props.comment.content}</p>
          <p class="card-text">
            <small class="text-muted" style={{ fontSize: '9.5px' }}>
              created by {props.comment._user.username},
              <Moment calendar={calendarStrings}>
                {props.comment.created_at}
              </Moment>
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default withRouter(CommentCard)
