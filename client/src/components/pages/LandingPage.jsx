import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'

import React, { useState } from 'react'
import api from '../../api'

function LandingPage(props) {
  function handleLogoutClick(e) {
    api.logout()
  }

  const isLoggedIn = api.isLoggedIn()

  return (
    <div className="container-full-width ">
      <div className="col-md first__box">
        <div
          className="Green__card"
          style={{ fontSize: '82px', lineHeight: '100px' }}
        >
          <div
            style={{
              zIndex: '10',
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'dark',
              opacity: 0.85,
            }}
          >
            Bo / <br />
            \ ca <br /> / as
          </div>
        </div>
        <div
          style={{ marginTop: '50px', marginLeft: '1px' }}
          className="AuthMethod"
        >
          {!isLoggedIn && <NavLink to="/login">login</NavLink>}
          {!isLoggedIn && (
            <NavLink style={{ marginLeft: '60px' }} to="/signup">
              signup
            </NavLink>
          )}
          {props.children}
        </div>
        {api.isLoggedIn() && (
          <Link to="/" onClick={handleLogoutClick}>
            Logout
          </Link>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '155px',
            left: '45px',
          }}
        >
          <span>
            {' '}
            <strong style={{ fontSize: '17px' }}>
              What are your friends reading?
            </strong>
          </span>
          <br />
          <br />

          <span style={{ fontSize: '15px', lineHeight: '0.1' }}>
            Chances are your friends are discussing their
            <br /> favorite books ('or not') on “Boocas”.
          </span>
        </div>

        {!api.isLoggedIn() && (
          <NavLink
            className=" Button__Shelf"
            to="/how-it-works"
            style={{
              fontSize: 24,
              position: 'absolute',
              right: '70px',
              bottom: '50px',
            }}
          >
            How it works
          </NavLink>
        )}
      </div>
      {/* <div className=" Landing__circle Spin__Circle" />
        <div className="Landing__circle" /> */}
      {/* <div className="col-md second__box">
          <div className="Green__strip" />
          <h1
            style={{
              position: 'absolute',
              top: '60px',
              right: '60px',
              textAlign: 'right',
            }}
          >
            <em>'Boocas'</em>
          </h1>
        </div>*/}
    </div>
  )
}

export default withRouter(LandingPage)
