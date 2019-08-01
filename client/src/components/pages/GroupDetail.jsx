import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { Button } from 'reactstrap'
import { withRouter } from 'react-router'
import MainNavbar from '../MainNavbar'
import ThoughtCard from '../ThoughtCard'
//import HideOnScroll from '../HideOnScroll'

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

  console.log('DEBUUUUUUUUU', groupDetails.thoughts)

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
    //<HideOnScroll>
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title={group.name} />
      </div>

      <div className="App__right__body">
        {/* <pre>{JSON.stringify(groupDetails, null, 2)}</pre> */}
        <div style={{ padding: '15px 30px' }}>
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
            {/* <h2>Group</h2>
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
            <img src={book.coverPictureUrl} width="100" alt="book-cover" /> */}
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
            {/* ------------------------------------------------------------- */}
            <div className=" card-columns" style={{ padding: '30px' }}>
              {thoughts.length === 0 && (
                <div>
                  <ThoughtCard
                    link={'/group-detail/' + groupId + '/create-thought'}
                    background="rgba(171, 191, 163, 0.3)"
                    title="Title"
                    _user={{}}
                    content={' / Create your first thought /'}
                  />
                </div>
              )}

              {thoughts.length > 0 && (
                <div>
                  <div>
                    <ThoughtCard
                      link={'/group-detail/' + groupId + '/create-thought'}
                      background="rgba(171, 191, 163, 0.3)"
                      title="Title"
                      _user={{}}
                      content={
                        'Here is the content you want to share about the Book with your group'
                      }
                    />
                  </div>
                  {thoughts
                    .sort(function(a, b) {
                      var date1 = new Date(a.created_at)
                      var date2 = new Date(b.created_at)

                      if (date2 > date1) {
                        return 1
                      } else if (date2 < date1) {
                        return -1
                      }

                      if (a.name < b.name) {
                        return -1
                      } else if (a.name > b.name) {
                        return 1
                      } else {
                        return 0
                      }
                    })
                    .map((thought, i) => (
                      <div key={i}>
                        <ThoughtCard
                          link={
                            '/group-detail/' +
                            groupId +
                            '/thought-detail/' +
                            thought._id
                          }
                          _user={thought._user}
                          title={thought.title}
                          content={thought.content}
                          _id={thought._id}
                          group={groupId}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    // </HideOnScroll>
  )
}

export default withRouter(GroupDetail)
