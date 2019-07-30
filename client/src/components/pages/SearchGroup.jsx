import React, { useState, useEffect } from 'react'
import { Input, UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap'
import api from '../../api'

import { Link, NavLink } from 'react-router-dom'
import MainNavbar from '../MainNavbar'

export default function SearchGroups(props) {
  const [stateSearch, setStateSearch] = useState([])

  const [stateInput, setStateInput] = useState({
    searchString: '',
    type: 'group',
  })

  const [stateMember, setStateMember] = useState([])

  useEffect(() => {
    api
      .getMyMemberships()
      .then(result => {
        setStateMember(result)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    let filtered = []
    if (stateInput.type === 'group')
      api.getGroups().then(response => {
        console.log(response)
        filtered = response.filter(group =>
          group.name
            .toUpperCase()
            .includes(stateInput.searchString.toUpperCase())
        )
        console.log(filtered)
        setStateSearch(filtered)
      })
    if (stateInput.type === 'book')
      api.getBooks().then(response => {
        console.log(response)
        filtered = response.filter(book =>
          book.title
            .toUpperCase()
            .includes(stateInput.searchString.toUpperCase())
        )
        setStateSearch(filtered)
      })
  }, [stateInput])

  function onButtonClick() {
    setStateInput({
      ...stateInput,
      type: stateInput.type === 'group' ? 'book' : 'group',
    })
  }

  function handleOnChange(e) {
    console.log('OnChange: ', e.target.value)
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setStateInput({
      ...stateInput,
      [e.target.name]: value,
    })
  }

  let myId = api.getUserId().toString()

  function createMembership(id) {
    let groupId = id
    api
      .createMembership({
        _user: myId,
        _group: groupId,
        isCreator: false,
      })
      .then(response => {
        console.log(response)
      })
      .then(() => {
        api.getMyMemberships().then(result => {
          setStateMember(result)
        })
      })
      .catch(err => console.log(err))
  }

  function isMember(groupId, memberships) {
    let GroupIds = memberships.map(membership =>
      membership._group._id.toString()
    )
    return GroupIds.includes(groupId)
  }

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Search a Group" />
      </div>
      <div className="App__right__body container">
        {
          //<div>
          // <pre>{JSON.stringify(stateInput, null, 2)}</pre>
          // <pre>{JSON.stringify(stateSearch, null, 2)}</pre>
          //   <pre>{JSON.stringify(stateMember, null, 2)}</pre>
          //</div>
        }
        <Button
          disabled={stateInput.type === 'book' ? true : false}
          onClick={onButtonClick}
          className={stateInput.type === 'book' ? 'active' : ''}
        >
          Book
        </Button>
        <Button
          disabled={stateInput.type === 'group' ? true : false}
          onClick={onButtonClick}
          className={stateInput.type === 'group' ? 'active' : ''}
        >
          Group
        </Button>
        <Input name="searchString" onChange={handleOnChange} />
        <span className="App__right__circle" />
        {stateInput.type == 'group' && (
          <div>
            <h1>Groups found</h1>
            {stateSearch.map((group, i) => (
              <div key={i}>
                <Link to="" id={'id' + i.toString()} style={{}}>
                  {group.name}
                </Link>
                <UncontrolledCollapse toggler={'#id' + i}>
                  <Card>
                    <CardBody>{group.description}</CardBody>
                    <CardBody>
                      {!isMember(group._id, stateMember) && (
                        <Button onClick={() => createMembership(group._id)}>
                          Join Group
                        </Button>
                      )}
                      {isMember(group._id, stateMember) && (
                        <span>You are a member of this group</span>
                      )}
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
