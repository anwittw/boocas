import React, { useState, useEffect } from 'react'
import {
  Input,
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  Collapse,
  Container,
  Row,
  Col,
} from 'reactstrap'
import api from '../../api'

import { Link, NavLink } from 'react-router-dom'
import MainNavbar from '../MainNavbar'
import Circle from '../Circle'

export default function SearchGroups(props) {
  const [stateSearch, setStateSearch] = useState([])
  const [idBookDisplayed, setIdBookDisplayed] = useState(null)
  const [idGroupDisplayed, setIdGroupDisplayed] = useState(null)

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
    setIdBookDisplayed(null)
    setIdGroupDisplayed(null)
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
        <MainNavbar
          title={
            stateInput.type === 'group'
              ? 'Join a Group'
              : 'Join a Group by book'
          }
        />
      </div>
      <div className="App__right__body">
        <Circle size="small" color="$orange" text="AF" />
        <Container className="mt-5">
          {
            //<div>
            // <pre>{JSON.stringify(stateInput, null, 2)}</pre>
            // <pre>{JSON.stringify(stateSearch, null, 2)}</pre>
            //   <pre>{JSON.stringify(stateMember, null, 2)}</pre>
            //</div>
          }
          <Row>
            <Col xs="12" md={{ size: 3, offset: 3 }}>
              <Button
                block
                disabled={stateInput.type === 'book' ? true : false}
                onClick={onButtonClick}
                className={stateInput.type === 'book' ? 'my__active' : ''}
              >
                Book
              </Button>
            </Col>
            <Col xs="12" md="3">
              <Button
                block
                disabled={stateInput.type === 'group' ? true : false}
                onClick={onButtonClick}
                className={stateInput.type === 'group' ? 'my__active' : ''}
              >
                Group
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs="12" md={{ size: 6, offset: 3 }}>
              <Input
                value={stateInput.searchString}
                name="searchString"
                onChange={handleOnChange}
              />
            </Col>
          </Row>
          {stateInput.type == 'group' && (
            <div className="mb-5">
              <Row className="mt-4">
                <Col
                  className="text-center"
                  xs="12"
                  md={{ size: 6, offset: 3 }}
                >
                  {stateSearch.length === 0 && <h1>No Groups found</h1>}
                </Col>
              </Row>
              <Row>
                <Col
                  className="text-center"
                  xs="12"
                  md={{ size: 6, offset: 3 }}
                >
                  {stateSearch.map((group, i) => (
                    <div
                      className="hover"
                      key={i}
                      onClick={() =>
                        setIdGroupDisplayed(
                          idGroupDisplayed === group._id ? null : group._id
                        )
                      }
                    >
                      <hr />
                      {group.name}
                      <Collapse
                        name={group._id}
                        isOpen={idGroupDisplayed === group._id}
                      >
                        <Card>
                          <CardBody>{group.description}</CardBody>
                          <CardBody>
                            {!isMember(group._id, stateMember) && (
                              <Button
                                onClick={() => createMembership(group._id)}
                              >
                                Join Group
                              </Button>
                            )}
                            {isMember(group._id, stateMember) && (
                              <span className="font-weight-bold">
                                You are a member of this group
                              </span>
                            )}
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                  ))}
                </Col>
              </Row>
            </div>
          )}
          {stateInput.type == 'book' && (
            <div className="mb-5">
              <Row className="mt-4">
                <Col
                  className="text-center"
                  xs="12"
                  md={{ size: 6, offset: 3 }}
                >
                  {stateSearch.length === 0 && <h1>No Books found</h1>}
                </Col>
              </Row>
              <Row>
                <Col
                  className="text-center"
                  xs="12"
                  md={{ size: 6, offset: 3 }}
                >
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
                      <Collapse
                        name={book._id}
                        isOpen={idBookDisplayed === book._id}
                      >
                        <Card>
                          <CardBody>
                            {stateGroup.groupsToRender.map(group => (
                              <div
                                className="hover"
                                onClick={() => changeToGroupSearch(group)}
                              >
                                {group.name}
                              </div>
                            ))}
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                  ))}
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}
