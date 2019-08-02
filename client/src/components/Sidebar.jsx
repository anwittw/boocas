import React, { useEffect, useContext } from 'react'
import { NavLink as NLink } from 'react-router-dom'
import api from '../api'
import { NavLink } from 'reactstrap'
import AppContext from '../contexts/AppContext'

export default function Sidebar(props) {
  console.log('RENDER Sidebar')
  const [myGroups, setMyGroups] = useContext(AppContext)

  useEffect(() => {
    api.getMyMemberships().then(memberships => {
      setMyGroups(memberships.map(membership => membership._group))
    })
  }, [setMyGroups])

  let sidebarStyle = {}
  if (!props.isDisplayed) {
    sidebarStyle.left = -227
  } else {
    sidebarStyle.left = 0
  }

  return (
    <div style={{ boxShadow: '90px 50px 70px grey' }}>
      <div className="Sidebar" style={sidebarStyle}>
        {/* {<pre>{JSON.stringify(myGroups, null, 2)}</pre>} */}
        <div className="Sidebar__top">
          <div>
            <NavLink tag={NLink} to="/" exact>
              <img
                alt="boocas-logo"
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
            myGroups
              .sort(function(a, b) {
                var date1 = new Date(a.created_at)
                var date2 = new Date(b.created_at)

                if (date2 > date1) {
                  return 1
                } else if (date2 < date1) {
                  return -1
                }

                if (a.name < b.name) {
                  return -1
                } else if (a.name > b.name) {
                  return 1
                } else {
                  return 0
                }
              })
              .map((group, i) => (
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
          {/* <button onClick={() => setCounter(counter + 1)}>
            counter = {counter}
          </button> */}
        </div>
      </div>
    </div>
  )
}
