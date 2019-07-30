import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

function ThoughtCard(props) {
  console.log(props)
  return (
    <div>
      <Link to={'/thought-detail/' + props._id}>
        <div
          className="card bg-white border-secondary mb-3 hover"
          style={{ maxWidth: '500px' }}
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
            <p className="card-text bg-white" style={{ fontSize: '14px' }}>
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
