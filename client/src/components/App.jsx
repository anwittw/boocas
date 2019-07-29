import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GroupDetail from './pages/GroupDetail'
import CreateGroup from './pages/CreateGroup'
import CreateThought from './pages/CreateThought'
import SearchGroup from './pages/SearchGroup'
import LandingPage from './pages/LandingPage'
import ThoughtDetail from './pages/ThoughtDetail'
import HowItWorks from './pages/HowItWorks'
import api from '../api'
import { withRouter } from 'react-router'
import MainNavbar from './MainNavbar'

function App(props) {
  return (
    <div>
      {api.isLoggedIn() && (
        <div className="App">
          <Sidebar />
          <div className="App__right">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/create-group" component={CreateGroup} />
              <Route
                path="/group-detail/:groupId/create-thought"
                component={CreateThought}
              />
              <Route path="/search-group" component={SearchGroup} />
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
            <Route path="/" exact component={LandingPage} />
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/create-group" component={CreateGroup} />
            <Route
              path="/group-detail/:groupId/create-thought"
              component={CreateThought}
            />
            <Route path="/search-group" component={SearchGroup} />
            <Route path="/group-detail/:groupId" component={GroupDetail} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      )}
    </div>
  )
}

export default withRouter(App)
