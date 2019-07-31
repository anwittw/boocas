import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button } from 'reactstrap'

// Component allows three different sizes

function setSize(size) {
  if (size === 'small') return 25
  if (size === 'medium') return 35
  if (size === 'large') return 40
}

function setFontSize(size) {
  if (size === 'small') return 12
  if (size === 'medium') return 14
  if (size === 'large') return 16
}

//Component allows two colors

function setColor(color) {
  if (color === 'success') return 'rgba(234, 184, 96, 0.8)'
  if (color === 'background') return 'rgba(244, 237, 222, 1)'
  return 'red'
}

export default function Circle(props) {
  let backgroundColor = setColor(props.color)
  let fontSize = setFontSize(props.size)
  let size = setSize(props.size)
  let text = ''

  let style = {
    fontSize: fontSize,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    backgroundColor: backgroundColor,
    borderRadius: '50%',
  }

  return (
    <div onClick={props.onClick} style={style}>
      <span>{props.text}</span>
    </div>
  )
}
