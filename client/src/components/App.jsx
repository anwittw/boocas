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
import About from './pages/About'
import AddUser from './pages/AddUser'
import api from '../api'
import { withRouter } from 'react-router'
import EditProfil from './pages/EditProfil'
import RecentActions from './pages/RecentActions'
import UserDetail from './pages/UserDetail'

import AppContext from '../contexts/AppContext'

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

  const [myGroups, setMyGroups] = useState([])

  let appRightStyle = {}
  if (isDisplayed) {
    appRightStyle.marginLeft = 227
  }

  return (
    <AppContext.Provider value={[myGroups, setMyGroups]}>
      <div>
        {api.isLoggedIn() && (
          <img
            alt="toogle-btn"
            className="toggle-sidebar"
            style={{ height: '65px', marginTop: '18px', opacity: 0.5 }}
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
                <Route exact path="/create-group" component={CreateGroup} />
                <Route
                  exact
                  path="/group-detail/:groupId/add-user"
                  component={AddUser}
                />
                <Route
                  exact
                  path="/group-detail/:groupId/create-thought"
                  component={CreateThought}
                />
                <Route exact path="/search-group" component={SearchGroup} />
                <Route exact path="/edit-profil" component={EditProfil} />
                <Route exact path="/recent-actions" component={RecentActions} />
                <Route
                  exact
                  path="/group-detail/:groupId"
                  component={GroupDetail}
                />
                <Route
                  exact
                  path="/group-detail/:groupId/thought-detail/:thoughtId"
                  component={ThoughtDetail}
                />
                <Route
                  exact
                  path="/group-detail/:groupId/user-detail/:userId"
                  component={UserDetail}
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
              <Route path="/about" component={About} />
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
    </AppContext.Provider>
  )
}

export default withRouter(App)
