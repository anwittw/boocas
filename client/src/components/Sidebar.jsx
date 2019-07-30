import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import api from '../api'
import { Button } from 'reactstrap'

export default function Sidebar() {
  const [myGroups, setMyGroups] = useState([])
  useEffect(() => {
    api.getMyMemberships().then(memberships => {
      setMyGroups(memberships.map(membership => membership._group))
    })
  }, [])

  return (
    <div className="Sidebar">
      {
        //<pre>{JSON.stringify(, null, 2)}</pre>
      }

      <div>
        <NavLink to="/" exact>
          <img
            style={{
              marginTop: '35px',
              maxWidth: '45%',
              display: 'block',
              marginLeft: 'auto',
              marginRight: ' auto',
              marginBottom: '30px',
            }}
            className="Logo"
            src={process.env.PUBLIC_URL + '/logo.png'}
          />
        </NavLink>
      </div>
      <div>
        <div>
          <NavLink
            to={'/search-group'}
            className="Button__Shelf"
            style={{ textAlign: 'center', fontSize: '17px' }}
          >
            <strong>Search a Group</strong>
          </NavLink>
        </div>
        <div>
          <NavLink
            to={'/create-group'}
            className="Button__Shelf"
            style={{ textAlign: 'center', fontSize: '17px' }}
          >
            <strong>Create a Group</strong>
          </NavLink>
          <hr />
        </div>
      </div>
      {myGroups.length === 0 && <h1>Fetching Groups...GluckGluckGluck</h1>}
      {myGroups.length !== 0 &&
        myGroups.map((group, i) => (
          <div key={i}>
            <NavLink to={'/group-detail/' + group._id}>{group.name}</NavLink>
            <hr />
          </div>
        ))}
    </div>
  )
}
