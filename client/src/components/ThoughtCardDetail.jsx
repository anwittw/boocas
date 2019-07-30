import React from 'react'
import { withRouter } from 'react-router'

function ThoughtCardDetail(props) {
  return (
    <div>
      <div className="card">
        <img src={props.titlePictureUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title" style={{ fontWeight: 'bold' }}>
            {props.title}
          </h5>
          <p className="card-text" style={{ fontSize: '14px' }}>
            {props.content}
          </p>
          <hr />
          <p className="card-text" style={{ fontSize: '12px' }}>
            Chapter {props.book_chapter} | Page {props.book_page}
          </p>
          {/* <hr />
          <p className="card-text" style={{ fontSize: '16px' }}>
            <small class="text-muted">a thought by {props.links}</small>
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default withRouter(ThoughtCardDetail)
