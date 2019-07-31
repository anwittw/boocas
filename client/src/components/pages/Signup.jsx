import React, { useState } from 'react'
import api from '../../api'

export default function Signup(props) {
  const [state, setState] = useState({
    username: '',
    name: '',
    password: '',
    message: null,
  })

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    let data = {
      username: state.username,
      name: state.name,
      password: state.password,
    }
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="Signup ">
      <br />
      {/* <h2 style={{ color: 'rgb(234, 184, 96)' }}>Signup</h2> */}
      <form>
        <br />
        <br />{' '}
        <input
          placeholder="username"
          type="text"
          value={state.username}
          name="username"
          onChange={handleInputChange}
        />{' '}
        <br />
        <br />{' '}
        <input
          placeholder="name"
          type="text"
          value={state.name}
          name="name"
          onChange={handleInputChange}
        />{' '}
        <br />
        <br />{' '}
        <input
          placeholder="password"
          type="password"
          value={state.password}
          name="password"
          onChange={handleInputChange}
        />{' '}
        <br />
        <br />
        <button
          style={{ width: '211px' }}
          className="btn btn-sm btn-outline-success"
          onClick={e => handleClick(e)}
        >
          Signup
        </button>
      </form>
      {state.message && <div className="info info-danger">{state.message}</div>}
    </div>
  )
}
