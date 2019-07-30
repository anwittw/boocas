import React, { useState, useEffect } from 'react'
import api from '../../api'
import MainNavbar from '../MainNavbar'

export default function Home() {
  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title={'Welcome'} />
      </div>

      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="..." className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <pre>{JSON.stringify(groups, null, 2)}</pre> */}
    </div>
  )
}
