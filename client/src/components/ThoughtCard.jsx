import React from 'react'
import { withRouter } from 'react-router'
import api from '../api'

function ThoughtCard(props) {
  return (
    <div>
      <div class="card bg-light mb-3" style="max-width: 18rem;">
        <div class="card-header">Header</div>
        <div class="card-body">
          <h5 class="card-title">dddd</h5>
          <p class="card-text" />
        </div>
      </div>
    </div>
  )
}

export default withRouter(ThoughtCard)
