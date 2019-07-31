import React, { useState, useEffect } from 'react'
import api from '../../api'
import MainNavbar from '../MainNavbar'
import { Link } from 'react-router-dom'
import GroupCard from '../GroupCard'

export default function Shelf() {
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
        <MainNavbar title={'Welcome to Boocas ' + username} />
      </div>
      <div className=" card-deck" style={{ padding: '30px' }}>
        {myMemberships
          .sort(function(a, b) {
            var date1 = new Date(a._group.updated_at)
            var date2 = new Date(b._group.updated_at)

            if (date2 > date1) return 1
            else return -1
          })
          .map((group, i) => (
            <div key={i}>
              <GroupCard
                link={'/group-detail/' + group._group._id}
                background="white"
                bookCover={group._group._book.coverPictureUrl}
                name={group._group.name}
                description={group._group.description}
              />
            </div>
          ))}
        <GroupCard
          link={'/create-group'}
          background="rgba(171, 191, 163, 0.3)"
          name="Title of your group"
          description="Here is the description of the group - f.e if you want to discuss specific or general topics - feel free!"
        />
      </div>

      {/* <div className="card-deck">
        
          
            .map(group => (
              <Link
                to={'/group-detail/' + group._group._id}
                key={group._group._id}
              >
                <div
                  className="hover card mb-3 bg-white border-secondary"
                  style={{
                    maxWidth: '500px',
                    minHeight: '270px',
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
      </div> */}
    </div>
  )
}
