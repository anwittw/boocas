import React, { useState } from 'react'
import api from '../api'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Circle from './Circle'
//import HideOnScroll from './HideOnScroll'

function MainNavbar(props) {
  const [stateOptions, setstateOptions] = useState(false)

  function handleLogoutClick(e) {
    api.logout()
  }

  return (
    // <HideOnScroll>
    <nav>
      <h1>{props.title}</h1>
      {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
      {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
      <div className="d-flex flex-row justify-content-start">
        <span className="Circle__button__profile">
          <Circle
            size="medium"
            color="success"
            onClick={() => setstateOptions(!stateOptions)}
            text="..."
          />
        </span>
        <div style={{ fontSize: '15px', marginTop: '4px', transition: '20s' }}>
          {stateOptions && (
            <div className="d-flex">
              <div className="ml-3">
                {api.isLoggedIn() && (
                  <Link to="/" onClick={handleLogoutClick}>
                    <span>Logout</span>
                  </Link>
                )}
              </div>
              <div className="ml-3">
                {api.isLoggedIn() && (
                  <Link to="/edit-profil">
                    <span>Edit profile</span>
                  </Link>
                )}
              </div>
              <div className="ml-3">
                {api.isLoggedIn() && (
                  <Link to="/recent-actions">
                    <span>Recent Actions</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
    //</HideOnScroll>
  )
}

export default withRouter(MainNavbar)
