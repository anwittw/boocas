import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({ lang: 'en' })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.username, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <div className="Login">
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
          className="btn btn-lg btn-outline-success"
        >
          Login
        </button>
      </form>
      {message && <div className="info info-danger">{message}</div>}
    </div>
  )
}
