import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { Button } from 'reactstrap'
import { withRouter } from 'react-router'
import MainNavbar from '../MainNavbar'

function GroupDetail(props) {
  //console.log('props: ', props.match)

  let groupId = props.match.params.groupId

  // The book is populated in group

  const [groupDetails, setGroupDetails] = useState({
    group: '',
    memberships: '',
    thoughts: '',
    myThoughts: '',
  })

  useEffect(() => {
    Promise.all([
      api.getGroup(groupId),
      api.getMembershipsByGroup(groupId),
      api.getThoughtsByGroup(groupId),
      api.getMyThoughtsByGroup(groupId),
    ]).then(([group, memberships, thoughts, myThoughts]) => {
      setGroupDetails({
        group: group,
        memberships: memberships,
        thoughts: thoughts,
        myThoughts: myThoughts,
      })
    })
  }, [groupId])

  let book = (groupDetails.group || {})._book
  let group = groupDetails.group
  let memberships = groupDetails.memberships
  let thoughts = groupDetails.thoughts

  console.log('DEBUG', api.getLocalStorageUser())

  function getIdOfCreator(memberships) {
    for (let i = 0; i < memberships.length; i++) {
      if (memberships[i].isCreator === true)
        return memberships[i]._user._id.toString()
    }
  }

  function userIsCreator() {
    let myId = api.getUserId().toString()
    let creatorId = getIdOfCreator(groupDetails.memberships)
    // console.log('myId', myId)
    // console.log('creatorId', creatorId)
    return myId === creatorId
  }

  return (
    <div>
      <div className="App__right__header">
        <MainNavbar title="Group Detail" />
      </div>

      {
        //<pre>{JSON.stringify(groupDetails, null, 2)}</pre>
      }
      <div className="App__right__body">
        <span className="App__right__circle" />
        <div>
          <Button
            tag={Link}
            to={groupId + '/create-thought'}
            className="btn btn-primary"
          >
            Create a thought
          </Button>
          {userIsCreator() && (
            <Button
              tag={Link}
              to={groupId + '/add-user'}
              className="btn btn-primary"
            >
              Add a user
            </Button>
          )}
        </div>
        {groupDetails.group && (
          <div>
            <h2>Group</h2>
            <ul>
              <li> {group.name} </li>
              <li> {group.description} </li>
              <li> {group.isPrivate && <span>PRIVATE GROUP</span>} </li>
            </ul>
            <h2>book</h2>
            <ul>
              <li> {book.title} </li>
              <li> {book.author} </li>
              <li> {book.year} </li>
            </ul>
            <img src={book.coverPictureUrl} width="100" alt="book-cover" />
            <h2>Members</h2>
            <ul>
              {memberships.map((membership, i) => (
                <li
                  key={i}
                  className={memberships[i].isCreator ? 'font-weight-bold' : ''}
                >
                  {memberships[i]._user.username}
                </li>
              ))}
            </ul>
            <h2>Thoughts</h2>
            <ul>
              {thoughts.map((thought, i) => (
                <li key={i}>
                  {' '}
                  <Link to={'/thought-detail/' + thought._id}>
                    {thought.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(GroupDetail)
