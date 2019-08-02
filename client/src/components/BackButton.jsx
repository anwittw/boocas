import React from 'react'
import { Button } from 'reactstrap'

export default function backButton(props) {
  return (
    <div>
      <Button
        block
        className="text-center"
        onClick={() => props.history.goBack()}
      >
        Back
      </Button>
    </div>
  )
}
