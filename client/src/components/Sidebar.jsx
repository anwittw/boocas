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

      <h2>Sidebar</h2>
      <div>
        <div>
          <Button tag={Link} to={'/search-group'} className="btn btn-primary">
            Search a Group
          </Button>
        </div>
        <div>
          <Button tag={Link} to={'/create-group'} className="btn btn-primary">
            Create a Group
          </Button>
        </div>
      </div>
      {myGroups.length === 0 && <h1>Fetching Groups...GluckGluckGluck</h1>}
      {myGroups.length !== 0 &&
        myGroups.map((group, i) => (
          <div key={i}>
            <NavLink to={'/group-detail/' + group._id}>{group.name}</NavLink>
          </div>
        ))}
    </div>
  )
}
