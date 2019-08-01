import React from 'react'
import { Container } from 'reactstrap'
import { Link, NavLink } from 'react-router-dom'
import api from '../../api'
import MainNavbar from '../MainNavbar'
import BackButton from '../BackButton'

export default function RecentActions(props) {
  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Edit Profil" />
      </div>
      <div className="App__right__body">
        <Container className="mt-5">
          edit profil
          <BackButton history={props.history} />
        </Container>
      </div>
    </div>
  )
}
