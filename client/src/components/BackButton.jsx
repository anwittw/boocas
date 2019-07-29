import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button } from 'reactstrap'

export default function backButton(props) {
  return (
    <div>
      <Button
        className="col-12 col-md-2 offset-md-5 text-center"
        onClick={() => props.history.goBack()}
      >
        Back
      </Button>
    </div>
  )
}
