import React from 'react'
import api from '../../api'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

function LandingPage(props) {
  function handleLogoutClick(e) {
    api.logout()
  }
  return (
    <div className="container-full-width ">
      <div className="row">
        <div className="col-sm first__box">
          <img src="/client/public/img/cov2.png" alt="" />
          <div className="Green__card" style={{ fontSize: '90px' }}>
            Bo / <br />
            _ ca <br />/ as
          </div>
          <NavLink to="/" exact />
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={handleLogoutClick}>
              Logout
            </Link>
          )}
        </div>
        <div className="Landing__circle" />
        <div className="col-sm second__box">
          <div className="Green__strip" />
          <h1>Boocas</h1>
        </div>
      </div>
    </div>
  )
}

export default withRouter(LandingPage)
