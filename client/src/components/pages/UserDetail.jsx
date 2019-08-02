import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import MainNavbar from '../MainNavbar'
import BackButton from '../BackButton'
import api from '../../api'

import Moment from 'react-moment'

export default function UserDetail(props) {
  let userId = props.match.params.userId

  const [userState, userSetstate] = useState(null)

  useEffect(() => {
    api.getUser(userId).then(user => {
      userSetstate(user)
    })
  }, [])

  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Profil Details" />
      </div>
      <div className="App__right__body">
        {
          //<pre>{JSON.stringify(userState, null, 2)}</pre>
        }
        <Container className="mt-5">
          {userState !== null && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div class="card mb-3" style={{ maxWidth: 540 }}>
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="/Profile_user.jpg" class="card-img" alt="..." />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">About me</h5>
                      <p class="card-text">
                        <small class="text-muted">
                          username: {userState[0].username}
                        </small>
                      </p>
                      <p class="card-text">
                        <small class="text-muted">
                          member since:{' '}
                          <Moment format="YYYY/MM/DD">
                            {userState[0].created_at}
                          </Moment>
                        </small>
                      </p>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptates a ea, reprehenderit nisi, eum quam provident
                        inventore corporis, non amet sequi. Reprehenderit,
                        laudantium laborum! Placeat exercitationem unde sequi
                        delectus sint?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ width: 540 }}>
                <BackButton history={props.history} />
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}
