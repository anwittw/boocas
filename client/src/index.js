import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import App from './components/App.jsx'
// import registerServiceWorker from './registerServiceWorker';

const ScrollToTop = ({ children, location: { pathname } }) => {
  // https://reacttraining.com/react-router/web/guides/scroll-restoration
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return children
}

const ScrollToTopWithRouter = withRouter(ScrollToTop)

ReactDOM.render(
  <Router>
    <ScrollToTopWithRouter>
      <App />
    </ScrollToTopWithRouter>
  </Router>,
  document.getElementById('root')
)
// registerServiceWorker();
