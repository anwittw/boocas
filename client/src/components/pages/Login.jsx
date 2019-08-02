import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link, NavLink } from 'react-router-dom'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({ lang: 'en' })
  const [message, setMessage] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.username, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/')
      })
      .catch(err => setMessage(err.toString()))
  }

  return (
    <div className="Login YesMobile1">
      {/* <h2>Login</h2> */}
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        {' '}
        <input
          placeholder="username"
          type="text"
          {...getInputProps('username')}
        />{' '}
        <br /> <br />
        <input
          placeholder="password"
          type="password"
          {...getInputProps('password')}
        />{' '}
        <br />
        <br />
        <button
          style={{ width: '211px' }}
          className="btn btn-sm btn-outline-success"
        >
          Login
        </button>
      </form>
      {message && <div className="info info-danger">{message}</div>}

      <div className="d-flex" style={{ marginTop: '5px' }}>
        <small>Don't have an account, yet?</small>
      </div>
      <NavLink
        style={{
          fontSize: '12px',
          float: 'right',
          marginTop: '5px',
          marginRight: '22px',
        }}
        to={'/signup'}
      >
        signup
      </NavLink>
    </div>
  )
}
