import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

import React, { useState } from 'react'
import api from '../../api'

function LandingPage(props) {
  function handleLogoutClick(e) {
    api.logout()
  }

  return (
    <div className="container-full-width ">
      <div className="row">
        <div className="col-sm first__box">
          <div
            className="Green__card"
            style={{ fontSize: '90px', lineHeight: '110px', zIndex: '1' }}
          >
            Bo / <br />
            _ ca <br /> / as
          </div>
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={handleLogoutClick}>
              Logout
            </Link>
          )}
          <img className="Books" src={process.env.PUBLIC_URL + '/Books.png'} />
        </div>
        <div className="Landing__circle" />
        <div className="col-sm second__box">
          {!api.isLoggedIn() && (
            <NavLink
              to="/how-it-works"
              style={{
                fontSize: 20,
                position: 'absolute',
                right: '110px',
                bottom: '50px',
              }}
            >
              How it works
            </NavLink>
          )}
          <div className="Green__strip" />
          <h1>Boocas</h1>
        </div>
      </div>
    </div>
  )
}

export default withRouter(LandingPage)
