import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from '../../api'
import MainNavbar from '../MainNavbar'
import BackButton from '../BackButton'

import Moment from 'react-moment'

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  lastWeek: '[last] dddd [at] LT',
  sameElse: 'L',
}

export default function RecentActions(props) {
  const [stateResult, setstateResult] = useState({
    today: [],
    yesterday: [],
    oneBeforeYesterday: [],
  })

  function setRelevantGroups(memberships) {
    return memberships.map(membership => membership._group._id.toString())
  }

  const [stateFetch, setstateFetch] = useState({
    memberships: [],
    relevant_groups: [],
    actions: [],
    myId: api.getUserId(),
  })

  useEffect(() => {
    Promise.all([api.getMyMemberships(), api.getActions()]).then(
      ([memberships, actions]) => {
        setstateFetch({
          ...stateFetch,
          memberships: memberships,
          relevant_groups: setRelevantGroups(memberships),
          actions: actions,
        })
      }
    )
  }, [])

  useEffect(() => {
    setstateResult(setAll(stateFetch.actions))
  }, [stateFetch])

  function isToday(someDate) {
    const today = new Date()
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    )
  }

  function isOneBeforeYesterday(someDate) {
    const today = new Date()
    const oneBeforeYesterday = new Date(today.setDate(today.getDate() - 2))
    return (
      someDate.getDate() === oneBeforeYesterday.getDate() &&
      someDate.getMonth() === oneBeforeYesterday.getMonth() &&
      someDate.getFullYear() === oneBeforeYesterday.getFullYear()
    )
  }

  function isYesterday(someDate) {
    const today = new Date()
    const yesterday = new Date(today.setDate(today.getDate() - 1))
    return (
      someDate.getDate() === yesterday.getDate() &&
      someDate.getMonth() === yesterday.getMonth() &&
      someDate.getFullYear() === yesterday.getFullYear()
    )
  }

  function setAll(actions) {
    let toFilter = []
    toFilter.push(...setCreatedBooks(actions))
    toFilter.push(...setMemberships(actions))
    toFilter.push(...setThoughts(actions))
    toFilter.push(...setComments(actions))

    if (toFilter.length > 0) {
      let toReturn = {
        today: toFilter.filter(element => isToday(new Date(element.date))),
        yesterday: toFilter.filter(element =>
          isYesterday(new Date(element.date))
        ),
        oneBeforeYesterday: toFilter.filter(element =>
          isOneBeforeYesterday(new Date(element.date))
        ),
      }
      return toReturn
    }
    return {
      today: [],
      yesterday: [],
      oneBeforeYesterday: [],
    }
  }

  function setCreatedBooks(actions) {
    return actions
      .filter(action => action.type === 'book')
      .map(filteredAction => {
        return {
          display: filteredAction.teaser,
          date: filteredAction.created_at,
        }
      })
  }

  function setMemberships(actions) {
    let filteredActions = actions.filter(
      action =>
        action.type === 'membership' &&
        stateFetch.relevant_groups.includes(action._group._id)
    )
    return filteredActions.map(filteredAction => {
      return {
        display:
          filteredAction._user._id === stateFetch.myId
            ? 'You are now member of: ' + filteredAction._group.name
            : filteredAction._user.username +
              ' joined ' +
              filteredAction._group.name,
        date: filteredAction.created_at,
        link: filteredAction.link,
      }
    })
  }

  function setThoughts(actions) {
    let filteredActions = actions.filter(
      action =>
        action.type === 'thought' &&
        stateFetch.relevant_groups.includes(action._group._id)
    )
    return filteredActions.map(filteredAction => {
      return {
        display:
          filteredAction._user._id === stateFetch.myId
            ? 'You created a new thought: ' + filteredAction.teaser
            : filteredAction._user.username +
              ' created a new thought: ' +
              filteredAction.teaser,
        date: filteredAction.created_at,
        link: filteredAction.link,
      }
    })
  }

  function setComments(actions) {
    let filteredActions = actions.filter(
      action =>
        action.type === 'comment' &&
        stateFetch.relevant_groups.includes(action._group._id)
    )
    return filteredActions.map(filteredAction => {
      return {
        display:
          filteredAction._user._id === stateFetch.myId
            ? 'You created a new comment: ' + filteredAction.teaser
            : filteredAction._user.username +
              ' created a new comment: ' +
              filteredAction.teaser,
        date: filteredAction.created_at,
        link: filteredAction.link,
      }
    })
  }

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Recent Actions" />
      </div>
      <div className="App__right__body">
        {
          // <pre>{JSON.stringify(stateFetch, null, 2)}</pre>
          // <h1>Result</h1>
          // <pre>{JSON.stringify(stateResult, null, 2)}</pre>
        }
        <Container className="mt-5">
          {stateResult.today.length > 0 && (
            <Row>
              <Col
                className="text-center"
                xs="12"
                md={{ size: '8', offset: 2 }}
              >
                <h1 className="mb-3">Today's Action's</h1>
                {stateResult.today.map((action, i) => (
                  <div key={`T${i}`} className="my-3">
                    <Link to={action.link}>
                      {action.display},{' '}
                      <span className="small text-muted">
                        <Moment calendar={calendarStrings}>
                          {action.date}
                        </Moment>
                      </span>
                    </Link>
                  </div>
                ))}
              </Col>
            </Row>
          )}
          {stateResult.yesterday.length > 0 && (
            <Row className="mt-5 mb-3">
              <Col
                className="text-center"
                xs="12"
                md={{ size: '8', offset: 2 }}
              >
                <hr />
                <h1 className="mb-3">Yesterday's Action's</h1>
                {stateResult.yesterday.map((action, i) => (
                  <div key={`Y${i}`} className="my-3">
                    <Link to={action.link}>
                      {action.display},{' '}
                      <span className="small text-muted">
                        <Moment calendar={calendarStrings}>
                          {action.date}
                        </Moment>
                      </span>
                    </Link>
                  </div>
                ))}
              </Col>
            </Row>
          )}
          {stateResult.oneBeforeYesterday.length > 0 && (
            <Row className="mt-5">
              <Col
                className="text-center"
                xs="12"
                md={{ size: '8', offset: 2 }}
              >
                <hr />
                <h1 className="mb-3"> The Day's before Yesterday's Action's</h1>
                {stateResult.oneBeforeYesterday.map((action, i) => (
                  <div key={`BY${i}`} className="my-3">
                    <Link to={action.link}>
                      {action.display},{' '}
                      <span className="small text-muted">
                        <Moment calendar={calendarStrings}>
                          {action.date}
                        </Moment>
                      </span>
                    </Link>
                  </div>
                ))}
              </Col>
            </Row>
          )}
          <Row className="my-5">
            <Col className="my-3" xs="12" md={{ size: '2', offset: 5 }}>
              <BackButton history={props.history} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
