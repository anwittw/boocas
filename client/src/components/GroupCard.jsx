import React from 'react'
import { Link } from 'react-router-dom'

export default function GroupCard(props) {
  return (
    <div>
      <Link to={props.link} className="text-decoration-none">
        <div
          className="hover card mb-3 border-secondary"
          style={{
            padding: '30px',
            maxWidth: '550px',
            minWidth: '245px',
            minHeight: '350px',
            backgroundColor: props.background,
          }}
        >
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={props.bookCover}
                className="card-img-top h-200 w-125"
                // style={{ padding: '20px 20px 0px 0px' }}
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <hr />
                <p className="card-text" style={{ fontSize: '11px' }}>
                  {props.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
