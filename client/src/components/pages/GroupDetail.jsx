import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import api from '../../api'
import { Button } from 'reactstrap'

export default function GroupDetail(props) {
  let groupId = props.match.params.groupId

  const [groupDetails, setgroupDetails] = useState([])

  Promise.all([
    api.getGroup(groupId),
    api.getMemberships(groupId),
    api.getThoughts(groupId),
    api.getMyThoughts(groupId),
  ]).then(([group, memberships, thoughts, mythoughts]) => {})

  return (
    <div>
      <h2>GroupDetail</h2>
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
