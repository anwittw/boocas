import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { Button } from 'reactstrap'
import { withRouter } from 'react-router'

function ThoughtDetail(props) {
  const [state, setState] = useState({})

  useEffect(() => {}, [])

  return (
    <div>
      <div className="App__right__header">
        <h1>GroupDetail</h1>
      </div>

      {
        //<pre>{JSON.stringify(groupDetails, null, 2)}</pre>
      }
      <div className="App__right__body">
        <span className="App__right__circle" />
        )}
      </div>
    </div>
  )
}

export default withRouter(ThoughtDetail)
