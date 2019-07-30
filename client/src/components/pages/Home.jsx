import React, { useState, useEffect } from 'react'
import api from '../../api'
import MainNavbar from '../MainNavbar'
import { Link } from 'react-router-dom'

export default function Home() {
  const [myMemberships, setMyMemberships] = useState([])

  let username = JSON.parse(localStorage.getItem('user')).username

  useEffect(() => {
    api.getMyMemberships().then(response => {
      setMyMemberships(response)
    })
  }, [])

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title={'Welcome ' + username} />
      </div>
      <span className="App__right__circle" />

      <div
        className="card-columns"
        style={{
          padding: '30px',
        }}
      >
        {myMemberships
          .sort(function(a, b) {
            var Date1 = new Date(a._group.created_at)
            var Date2 = new Date(b._group.created_at)

            if (Date2 > Date1) return 1
            if (Date1 < Date2) return -1
          })
          .map(group => (
            <Link
              to={'/group-detail/' + group._group._id}
              key={group._group._id}
            >
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
                      style={{ padding: '20px 20px 0px 0px' }}
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
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div
        className="card-columns"
        style={{
          padding: '30px',
        }}
      >
        <Link to={'/create-group'}>
          <div
            className="hover card mb-3 bg-secondary"
            style={{
              maxWidth: '500px',
              padding: '0px 0px 20px 20px',
            }}
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src=""
                  className="card-img"
                  style={{ padding: '20px 20px 0px 0px' }}
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>Title</strong>
                  </h5>
                  <hr />
                  <p className="card-text">
                    <small>Description</small>
                  </p>
                  <p className="card-text">
                    <small>Click to create a Group</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
