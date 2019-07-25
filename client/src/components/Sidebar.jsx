import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <h2>Sidebar</h2>
      <NavLink to="/group-detail/123">Group 123</NavLink> <br />
      <NavLink to="/group-detail/276">Group 276</NavLink>
      <br />
    </div>
  )
}
