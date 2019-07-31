import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidebar from './Sidebar'
import Shelf from './pages/Shelf'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GroupDetail from './pages/GroupDetail'
import CreateGroup from './pages/CreateGroup'
import CreateThought from './pages/CreateThought'
import SearchGroup from './pages/SearchGroup'
import LandingPage from './pages/LandingPage'
import ThoughtDetail from './pages/ThoughtDetail'
import HowItWorks from './pages/HowItWorks'
import AddUser from './pages/AddUser'
import api from '../api'
import { withRouter } from 'react-router'
import MainNavbar from './MainNavbar'
import EditProfil from './pages/EditProfil'

const LandingPageWrapper = () => {
  return (
    <LandingPage>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </LandingPage>
  )
}

function App(props) {
  const [isDisplayed, setIsDisplayed] = useState(window.innerWidth >= 1000)
  function toggleSidebar() {
    setIsDisplayed(!isDisplayed)
  }

  let appRightStyle = {}
  if (isDisplayed) {
    appRightStyle.marginLeft = 227
  }

  return (
    <div>
      {api.isLoggedIn() && (
        <img
          className="toggle-sidebar"
          style={{ height: '112px', marginTop: '6px', opacity: 0.5 }}
          onClick={toggleSidebar}
          src={process.env.PUBLIC_URL + '/pushBar.png'}
        />
      )}
      {api.isLoggedIn() && (
        <div className="App">
          <Sidebar isDisplayed={isDisplayed} />
          <div className="App__right" style={appRightStyle}>
            <Switch>
              <Route path="/" exact component={Shelf} />
              <Route path="/create-group" component={CreateGroup} />
              <Route
                path="/group-detail/:groupId/add-user"
                component={AddUser}
              />
              <Route
                path="/group-detail/:groupId/create-thought"
                component={CreateThought}
              />
              <Route path="/search-group" component={SearchGroup} />
              <Route path="/edit-profil" component={EditProfil} />
              <Route path="/group-detail/:groupId" component={GroupDetail} />
              <Route
                path="/thought-detail/:thoughtId"
                component={ThoughtDetail}
              />
              <Route render={() => <h2>404</h2>} />
            </Switch>
          </div>
        </div>
      )}
      {!api.isLoggedIn() && (
        <div className="App__Logout">
          {/* <MainNavbar /> */}
          <Switch>
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/" component={LandingPageWrapper} />
            <Route path="/create-group" component={CreateGroup} />
            <Route
              path="/group-detail/:groupId/create-thought"
              component={CreateThought}
            />
            <Route path="/search-group" component={SearchGroup} />
            <Route path="/group-detail/:groupId" component={GroupDetail} />
            {/* <Route path="/" exact component={Home} /> */}
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      )}
    </div>
  )
}

export default withRouter(App)
