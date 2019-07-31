import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button } from 'reactstrap'

// Component allows three different sizes

function setSize(size) {
  if (size === 'small') return 30
  if (size === 'medium') return 50
  if (size === 'large') return 80
}

//Component allows all colors

export default function Circle(props) {
  let size = setSize(props.size)
  let text = ''

  let style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    backgroundColor: 'red',
    borderRadius: '50%',
  }

  return (
    <div style={style}>
      <span>{props.text}</span>
    </div>
  )
}
