import React, { useState, useEffect } from 'react'
import { NavLink as NLink } from 'react-router-dom'
import api from '../api'
import { NavLink } from 'reactstrap'

export default function Sidebar(props) {
  const [myGroups, setMyGroups] = useState([])
  useEffect(() => {
    api.getMyMemberships().then(memberships => {
      setMyGroups(memberships.map(membership => membership._group))
    })
  }, [])

  let sidebarStyle = {}
  if (!props.isDisplayed) {
    sidebarStyle.left = -227
  } else {
    sidebarStyle.left = 0
  }

  return (
    <div style={{ boxShadow: '90px 50px 70px grey' }}>
      <div className="Sidebar" style={sidebarStyle}>
        {
          //<pre>{JSON.stringify(, null, 2)}</pre>
        }
        <div className="Sidebar__top">
          <div>
            <NavLink tag={NLink} to="/" exact>
              <img
                style={{
                  marginTop: '35px',
                  maxWidth: '45%',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: ' auto',
                  marginBottom: '5px',
                }}
                className="Logo"
                src={process.env.PUBLIC_URL + '/logo.png'}
              />
            </NavLink>
          </div>
          <div>
            <div>
              <NavLink
                tag={NLink}
                to={'/search-group'}
                className="Button__Shelf"
                style={{ textAlign: 'center', fontSize: '17px' }}
              >
                <strong>Join a Group</strong>
              </NavLink>
            </div>
            <div>
              <NavLink
                tag={NLink}
                to={'/create-group'}
                className="Button__Shelf"
                style={{ textAlign: 'center', fontSize: '17px' }}
              >
                <strong>Create a Group</strong>
              </NavLink>
              <hr />
            </div>
          </div>
        </div>
        <div className="Sidebar__groups">
          {myGroups.length === 0 && <p>No groups</p>}
          {myGroups.length !== 0 &&
            myGroups.map((group, i) => (
              <div key={i}>
                <NavLink
                  className="Active__sidebar"
                  tag={NLink}
                  activeClassName="active"
                  to={'/group-detail/' + group._id}
                >
                  {group.name}
                </NavLink>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
