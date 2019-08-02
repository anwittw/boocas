import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

import React from 'react'
import api from '../../api'

function LandingPage(props) {
  function handleLogoutClick(e) {
    api.logout()
  }

  const isLoggedIn = api.isLoggedIn()

  return (
    <div>
      <div className="container-full-width ">
        <div className="col-md first__box">
          <div
            className="Green__card"
            style={{ fontSize: '82px', lineHeight: '100px' }}
          >
            <div className=" Landing__circle Spin__Circle NotMobile" />
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
              \ oc <br /> / as
            </div>
          </div>
          <div
            style={{ marginTop: '50px', marginLeft: '1px' }}
            className="AuthMethod YesMobile"
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
            className="YesMobile2"
            style={{
              position: 'absolute',
              bottom: '21%',
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

            <span style={{ fontSize: '90%', lineHeight: '0.1' }}>
              Chances are your friends are discussing their
              <br /> favorite books \ and least favorite \ on 'Boocas'.
            </span>
          </div>

          {!api.isLoggedIn() && (
            <NavLink
              className=" Button__Shelf NotMobile"
              to="/how-it-works"
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                position: 'absolute',
                right: '90px',
                bottom: '7%',
              }}
            >
              How it works
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(LandingPage)
