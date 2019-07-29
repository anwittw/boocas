import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Table } from 'reactstrap'
import api from '../../api'

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
      <div>
        <h1>Add a User to your Group</h1>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <pre>{JSON.stringify(allUser, null, 2)}</pre>
        <pre>{JSON.stringify(allMembership, null, 2)}</pre>
        <div>
          <Input
            type="text"
            name="search"
            placeholder="Search"
            value={state.search}
            onChange={handleChange}
          />
        </div>
        <div>
          <Table hover>
            {/* <thead>
              <tr>
                <th>username</th>
                <th>A</th>
              </tr>
            </thead> */}
            <tbody>
              {filterByMembership(allUser)
                .filter(user => filterBySearchBar(user))
                .map((user, i) => (
                  <tr key={i}>
                    <td className="align-middle">{user.username}</td>
                    <td className="align-middle">
                      <Button
                        tag={Link}
                        id={user._id}
                        to={'/group-detail/' + groupId + '/add-user'}
                        onClick={handleSubmitMembership}
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}
