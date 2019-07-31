import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import api from '../../api'

export default function EditProfil() {
  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Edit Profil" />
      </div>
      <div className="App__right__body">
        <Container className="mt-5">edit profil</Container>
      </div>
    </div>
  )
}
