import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import api from '../../api'

export default function HowItWorks() {
  return (
    <div className="container-full-width ">
      <div className="Green__strip__2" />
      <div className="Landing__circle__other " />
      <div
        style={{
          textAlign: 'center',
          position: 'absolute',
          right: '560px',
          top: '170px',
        }}
      >
        <h4>
          <strong>How it works</strong>
        </h4>
        <br />
        <br />
        <h6>
          Add or search for a book of your <br />
          interest
        </h6>
        <br />
        <h6>Register and add to your profile</h6>
        <br />
        <h6>Join the group</h6>
        <br />
        <h6>
          Share your thoughts on the books <br />
          you are reading
        </h6>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {
          <NavLink className="Button__Shelf" to="/">
            <h5>
              <em>Home</em>
            </h5>
          </NavLink>
        }
      </div>
    </div>
  )
}
