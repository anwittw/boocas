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
      <div className="row">
        <div className="col-md first__box">
          <div
            className="Green__card"
            style={{ fontSize: '82px', lineHeight: '110px' }}
          >
            <div style={{ zIndex: '10', textAlign: 'center' }}>
              Bo / <br />
              _ ca <br /> / as
            </div>
          </div>
          <div
            className="AuthMethod"
            style={{ marginTop: '55px', marginLeft: '40px' }}
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
          <img className="Books" src={process.env.PUBLIC_URL + '/Books.png'} />
        </div>
        <div className="Landing__circle" />
        <div className="col-md second__box">
          <div
            style={{
              position: 'absolute',
              top: '320px',
              left: '155px',

              textAlign: 'right',
            }}
          >
            <span>
              {' '}
              <strong style={{ fontSize: '17px' }}>
                What are your friends
                <br />
                reading?
              </strong>
            </span>
            <br />
            <span style={{ fontSize: '13px', lineHeight: '0.1' }}>
              Chances are your friends
              <br /> are discussing their
              <br /> favorite books on “Boocas”.
            </span>
          </div>

          {!api.isLoggedIn() && (
            <NavLink
              className=" Button__Shelf"
              to="/how-it-works"
              style={{
                fontSize: 20,
                position: 'absolute',
                right: '90px',
                bottom: '35px',
              }}
            >
              How it works
            </NavLink>
          )}
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
        </div>
      </div>
    </div>
  )
}

export default withRouter(LandingPage)
