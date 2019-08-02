import React from 'react'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  lastWeek: '[last] dddd [at] LT',
  sameElse: 'L',
}

export default function GroupCard(props) {
  return (
    <div>
      <Link to={props.link} className="text-decoration-none">
        <div
          className="hover card mb-4 border-secondary"
          style={{
            padding: '30px',
            maxWidth: '500px',

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
                <p className="card-text" style={{ fontSize: '12px' }}>
                  {props.description}
                </p>
                <hr />
                <small className="text-muted" style={{ fontSize: '10px' }}>
                  <Moment calendar={calendarStrings}>
                    {props.group.created_at}
                  </Moment>
                </small>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
