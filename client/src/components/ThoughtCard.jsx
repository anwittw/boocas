import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

function ThoughtCard(props) {
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
            <p
              className="card-text"
              style={{
                fontSize: '14px',
              }}
            >
              {props.content}
              <br />
              <hr />
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    color: 'grey',
                    fontSize: '11px',
                  }}
                >
                  a thought by {props._user.username}
                </span>
              </div>
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default withRouter(ThoughtCard)
