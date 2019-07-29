import React from 'react'
import api from '../api'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

function MainNavbar(props) {
  function handleLogoutClick(e) {
    api.logout()
  }
  return (
    <nav>
<<<<<<< HEAD
      <h1>bookbook</h1>
      {/* <NavLink to="/" exact>
=======
      <h1>{props.title}</h1>
      <NavLink to="/" exact>
>>>>>>> c7e569da1b91ef62fe0a3a38d5a7dd47e6691ddc
        Home
      </NavLink> */}
      {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
      {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
      {api.isLoggedIn() && (
        <Link to="/" onClick={handleLogoutClick}>
          Logout
        </Link>
      )}
    </nav>
  )
}

export default withRouter(MainNavbar)
