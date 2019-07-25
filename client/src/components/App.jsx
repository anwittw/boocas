import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Sidebar from './Sidebar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GroupDetail from './pages/GroupDetail'
import api from '../api'
import { withRouter } from 'react-router'

function App(props) {
  return (
    <div className="App">
      {api.isLoggedIn() && <Sidebar />}
      <div className="App__right">
        <MainNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/group-detail/:groupdId" component={GroupDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(App)
