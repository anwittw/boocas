import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import api from './../api'

import Circle from './Circle'

function ThoughtCard(props) {
  let myId = api.getUserId()

  function checkForCreator(prop) {
    try {
      return myId === prop.toString()
    } catch (err) {
      return false
    }
  }

  function deleteThought(id, e) {
    e.preventDefault()
    api.deleteThought(id).then(thought => {
      console.log(thought)
    })
  }

  console.log(props)
  return (
    <div>
      <Link to={props.link}>
        <div
          className="card border-secondary mb-3 hover"
          style={{
            maxWidth: '500px',
            backgroundColor: props.background,
          }}
        >
          <div className="card-body">
            <h5
              className="card-title"
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {props.title}
              <hr />
            </h5>
            <div
              className="card-text"
              style={{
                fontSize: '14px',
              }}
            >
              {props.content}
              <br />
              <hr />
              <div className="d-flex">
                {checkForCreator(props._user._id) && (
                  <div style={{ zIndex: 1 }} className="flex-grow-1">
                    <Circle
                      size="medium"
                      color="success"
                      onClick={e => deleteThought(props._id, e)}
                      text="X"
                    />
                  </div>
                )}
                <div className="flex-grow-1" style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      color: 'grey',
                      fontSize: '11px',
                    }}
                  >
                    a thought by {props._user.username}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default withRouter(ThoughtCard)
