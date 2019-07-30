import React, { useState, useEffect } from 'react'
import {
  Input,
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  Collapse,
} from 'reactstrap'
import api from '../../api'

import { Link, NavLink } from 'react-router-dom'
import MainNavbar from '../MainNavbar'

export default function SearchGroups(props) {
  const [stateSearch, setStateSearch] = useState([])
  const [idBookDisplayed, setIdBookDisplayed] = useState(null)

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

  const [stateGroup, setStateGroup] = useState({
    allGroups: [],
    groupsToRender: [],
  })

  useEffect(() => {
    api
      .getGroups()
      .then(result => {
        setStateGroup({
          allGroups: result,
          groupsToRender: [],
        })
      })
      .catch(err => console.log(err))
  }, [])

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

  function setGroupsToRender(id) {
    if (id !== null) {
      let toRender = stateGroup.allGroups.filter(
        group => group._book.toString() === id.toString()
      )
      setStateGroup({
        ...stateGroup,
        groupsToRender: toRender,
      })
    }
    setIdBookDisplayed(id)
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

  const [stateCollapse, setStateCollapse] = useState([])

  useEffect(() => {
    let array = stateSearch.map(book => {
      return { [book._id]: true }
    })

    console.log('array: ', array)
  }, [stateSearch])

  function changeToGroupSearch(group) {
    setStateInput({
      ...stateInput,
      searchString: group.name,
      type: 'group',
    })
  }

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Search a Group" />
      </div>
      <div className="App__right__body container ">
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
          className={stateInput.type === 'book' ? 'my__active' : ''}
        >
          Book
        </Button>
        <Button
          disabled={stateInput.type === 'group' ? true : false}
          onClick={onButtonClick}
          className={stateInput.type === 'group' ? 'my__active' : ''}
        >
          Group
        </Button>
        <Input
          value={stateInput.searchString}
          name="searchString"
          onChange={handleOnChange}
        />
        <span className="App__right__circle" />
        {stateInput.type == 'group' && (
          <div>
            {stateSearch.length > 0 && <h1>Groups found</h1>}
            {stateSearch.length === 0 && <h1>No Groups found</h1>}
            {stateSearch.map((group, i) => (
              <div key={i}>
                <hr />
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
        {stateInput.type == 'book' && (
          <div>
            {stateSearch.length > 0 && <h1>Books found</h1>}
            {stateSearch.length === 0 && <h1>No Books found</h1>}
            {stateSearch.map((book, i) => (
              <div
                key={i}
                onClick={() =>
                  setGroupsToRender(
                    idBookDisplayed === book._id ? null : book._id
                  )
                }
              >
                <hr />
                {book.title}
                <Collapse name={book._id} isOpen={idBookDisplayed === book._id}>
                  <Card>
                    <CardBody>
                      {stateGroup.groupsToRender.map(group => (
                        <div onClick={() => changeToGroupSearch(group)}>
                          {group.name}
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
