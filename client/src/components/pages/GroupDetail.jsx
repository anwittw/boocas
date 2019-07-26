import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import api from '../../api'
import { Button } from 'reactstrap'

export default function GroupDetail(props) {
  console.log('props: ', props.match)

  let groupId = props.match.params.groupId
  console.log('groupId_value: ', groupId)

  const [page, setPage] = useState(groupId)

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
        myThoughts: thoughts,
      })
    })
  }, [groupId])

  return (
    <div>
      <h2>GroupDetail</h2>
      <pre>{JSON.stringify(groupDetails, null, 2)}</pre>
      <div>
        <div>
          <Button tag={Link} to={'/create-thought'} className="btn btn-primary">
            Create a search
          </Button>
        </div>
        <div>
          <Button tag={Link} to={'/create-group'} className="btn btn-primary">
            Create a Group
          </Button>
        </div>
      </div>
    </div>
  )
}
