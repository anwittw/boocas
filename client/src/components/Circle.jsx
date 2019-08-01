import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button } from 'reactstrap'

// Component allows three different sizes

function setSize(size) {
  if (size === 'small') return 25
  if (size === 'medium') return 30
  if (size === 'large') return 35
}

function setFontSize(size) {
  if (size === 'small') return 10
  if (size === 'medium') return 12
  if (size === 'large') return 14
}

function setFontWeight(size) {
  if (size === 'small') return 'normal'
  if (size === 'medium') return 'normal'
  if (size === 'large') return 'bold'
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
  let fontWeight = setFontWeight(props.size)
  let size = setSize(props.size)
  let text = ''
  let link = props.link ? props.link : ''

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
    fontWeight: fontWeight,
  }

  return (
    <div className={props.className}>
      {link && (
        <Link className="text-decoration-none" to={link}>
          <div onClick={props.onClick} style={style}>
            <span>{props.text}</span>
          </div>
        </Link>
      )}
      {!link && (
        <div onClick={props.onClick} style={style}>
          <span>{props.text}</span>
        </div>
      )}
    </div>
  )
}
