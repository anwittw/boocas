import React from 'react'
import GroupDetail from './GroupDetail'

export default function ThoughtCard(props) {
  return (
    <div>
      <div class="card bg-light mb-3" style="max-width: 18rem;">
        <div class="card-header">Header</div>
        <div class="card-body">
          <h5 class="card-title">{GroupDetail.group.name}</h5>
          <p class="card-text" />
        </div>
      </div>
    </div>
  )
}
