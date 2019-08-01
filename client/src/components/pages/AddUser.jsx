import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Input, Button, Table, Label, Container, Col, Row } from 'reactstrap'
import api from '../../api'
import MainNavbar from '../MainNavbar'
import BackButton from '../BackButton'

export default function AddUser(props) {
  let groupId = props.match.params.groupId

  const [state, setState] = useState({
    search: '',
  })

  const [allUser, setAllUser] = useState([])

  const [allMembership, setAllMembership] = useState([])

  useEffect(() => {
    api.getUsers().then(response => {
      setAllUser(response)
    })
  }, [])

  useEffect(() => {
    api.getMembershipsByGroup(groupId).then(response => {
      setAllMembership(
        response.map(membership => {
          return membership._user._id
        })
      )
    })
  }, [state])

  function filterBySearchBar(allUser) {
    return allUser.username.toUpperCase().includes(state.search.toUpperCase())
  }

  function filterByMembership(allUser) {
    let result = [...allUser]
    return result.filter(user => !allMembership.includes(user._id.toString()))
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmitMembership(e) {
    console.log(e.target.id)

    e.preventDefault()

    api
      .createMembership({
        _user: e.target.id,
        _group: groupId,
        isCreator: false,
      })

      .then(response => {
        setState({
          search: '',
        })

        console.log(response)

        // props.history.push('/group-detail/' + groupId + '/add-user')
      })
  }

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Add a User to this Group" />
      </div>
      <div className="App__right__body">
        <Container className="mt-5">
          {/* <pre>{JSON.stringify(state, null, 2)}</pre>
        <pre>{JSON.stringify(allUser, null, 2)}</pre>
        <pre>{JSON.stringify(allMembership, null, 2)}</pre> */}
          <Row className="mt-3 mb-5">
            <Col xs="12" md={{ size: 8, offset: 2 }}>
              <Input
                type="text"
                name="search"
                placeholder="Search"
                value={state.search}
                onChange={handleChange}
              />
            </Col>
          </Row>
          {filterByMembership(allUser)
            .filter(user => filterBySearchBar(user))
            .map((user, i) => (
              <Row className="my-3">
                <Col xs={{ size: 4, offset: 3 }}>{user.username}</Col>
                <Col xs={{ size: 2 }}>
                  <Button
                    block
                    tag={NavLink}
                    id={user._id}
                    to={'/group-detail/' + groupId + '/add-user'}
                    onClick={handleSubmitMembership}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            ))}
          <div>
            <Row className="my-5">
              <Col xs="12" md={{ size: 2, offset: 5 }}>
                <BackButton history={props.history} />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  )
}
