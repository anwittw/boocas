import React, { useState, useEffect } from 'react'
import api from '../../api'
import MainNavbar from '../MainNavbar'
import { Link } from 'react-router-dom'

export default function Home() {
  const [myMemberships, setMyMemberships] = useState([])

  const [user, setUser] = useState('')

  useEffect(() => {
    api.getMyMemberships().then(response => {
      setMyMemberships(response)
    })
  }, [])

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title={'Welcome'} />
      </div>
      <span className="App__right__circle" />

      <div
        className="card-columns"
        style={{
          padding: '30px',
        }}
      >
        {myMemberships.map(group => (
          <Link to={'/group-detail/' + group._group._id}>
            <div
              className="hover card mb-3 bg-white border-secondary"
              style={{
                maxWidth: '500px',
                padding: '0px 0px 20px 20px',
              }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={group._group._book.coverPictureUrl}
                    className="card-img"
                    style={{ padding: '20px 0px 0px 0px' }}
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>{group._group.name}</strong>
                    </h5>
                    <hr />
                    <p className="card-text">
                      <small>{group._group.description}</small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <pre>{JSON.stringify(myMemberships, null, 2)}</pre>
    </div>
  )
}
