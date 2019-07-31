import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
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
