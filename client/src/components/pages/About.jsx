import React from 'react'
import { NavLink } from 'react-router-dom'

export default function About() {
  return (
    <div className="container-full-width d-flex flex-direction-row">
      <div className="Green__strip__2" />
      <div className="Landing__circle__other " />

      <div
        style={{
          textAlign: 'center',
          position: 'absolute',
          right: '515px',
          top: '150px',
        }}
      >
        <h4>
          <strong>About</strong>
        </h4>
        <br />
        <h6 style={{ fontSize: '14px', marginBottom: '20px' }}>
          Boocas was created as contribution
          <br />
          to the final projects for the <br />{' '}
          <a href="https://www.ironhack.com">
            IRONHACK Web Dev Lisbon Bootcamp
          </a>{' '}
          #144 by:
        </h6>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img
              style={{ width: 110, height: 110, margin: '12px', opacity: 0.7 }}
              src={process.env.PUBLIC_URL + '/ingo-cover.png'}
              alt=""
            />
            <a style={{ fontSize: '14px' }} href="https://github.com/igrossma/">
              Ingo Großmann
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img
              style={{ width: 110, height: 110, margin: '12px', opacity: 0.7 }}
              src={process.env.PUBLIC_URL + '/andre-cover.png'}
              alt=""
            />
            <a style={{ fontSize: '14px' }} href="https://github.com/anwittw/">
              Andre Wittwer
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img
              style={{ width: 110, height: 110, margin: '12px', opacity: 0.7 }}
              src={process.env.PUBLIC_URL + '/carlos-cover.png'}
              alt=""
            />
            <a
              style={{ fontSize: '14px' }}
              href="https://github.com/carlosbotto/"
            >
              Carlos Botto
            </a>
          </div>
        </div>
        <div />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        {
          <NavLink className="Button__Shelf" to="/">
            <h5>
              <em>Home</em>
            </h5>
          </NavLink>
        }
      </div>
    </div>
  )
}
