import axios from 'axios'

// console.log(process.env.NODE_ENV)

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : `http://${window.location.hostname}:5000/api`,

  withCredentials: true,
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  getUserId() {
    let user = JSON.parse(localStorage.getItem('user'))
    return user._id
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service.get('/logout')
  },

  addPicture(file) {
    const formData = new FormData()
    formData.append('picture', file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
  getBooks() {
    return service
      .get('/books')
      .then(res => res.data)
      .catch(errHandler)
  },

  getBook(bookId) {
    return service
      .get('/books' + bookId)
      .then(res => res.data)
      .catch(errHandler)
  },
  createBook(body) {
    return service
      .post('/books', body)
      .then(res => res.data)
      .catch(errHandler)
  },
  createGroup(body) {
    return service
      .post('/groups', body)
      .then(res => res.data)
      .catch(errHandler)
  },
  getGroup(groupId) {
    return service
      .get('/groups/' + groupId)
      .then(res => res.data)
      .catch(errHandler)
  },
  getGroups() {
    return service
      .get('/groups/')
      .then(res => res.data)
      .catch(errHandler)
  },
  getThoughtsByGroup(groupId) {
    return service
      .get('/thoughts/?group=' + groupId)
      .then(res => res.data)
      .catch(errHandler)
  },
  getMyThoughtsByGroup(groupId) {
    return service
      .get('/thoughts/?mine=true&group=' + groupId)
      .catch(errHandler)
  },
  createMembership(body) {
    return service
      .post('/memberships', body)
      .then(res => res.data)
      .catch(errHandler)
  },
  getMyMemberships() {
    return service
      .get('/memberships/?mine=true')
      .then(res => res.data)
      .catch(errHandler)
  },
  getMembershipsByGroup(groupId) {
    return service
      .get('/memberships/?group=' + groupId)
      .then(res => res.data)
      .catch(errHandler)
  },
  createThought(uploadData) {
    return service
      .post('/thoughts', uploadData)
      .then(res => res.data)
      .catch(errHandler)
  },
  getThought(thoughtId) {
    return service
      .get('/thoughts/' + thoughtId)
      .then(res => res.data)
      .catch(errHandler)
  },
  deleteThought(thoughtId) {
    return service
      .delete('/thoughts/' + thoughtId)
      .then(res => res.data)
      .catch(errHandler)
  },
  createComment(comment) {
    return service
      .post('/comments', comment)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteComment(commentId) {
    return service
      .delete('/comments/' + commentId)
      .then(res => res.data)
      .catch(errHandler)
  },

  getCommentsByThought(thoughtId) {
    return service
      .get('/comments/?thought=' + thoughtId)
      .then(res => res.data)
      .catch(errHandler)
  },
  getUsers() {
    return service
      .get('/users/')
      .then(res => res.data)
      .catch(errHandler)
  },
  getUser(userId) {
    return service
      .get('/users/' + userId)
      .then(res => res.data)
      .catch(errHandler)
  },
  getActions() {
    return service
      .get('/actions/')
      .then(res => res.data)
      .catch(errHandler)
  },
}

// This is an example on how to use this method in a different file
//  api.getCountries().then(countries => { /* ... */ })
// getCountries() {
//   return service
//     .get('/countries')
//     .then(res => res.data)
//     .catch(errHandler)
// },

// addCountry(body) {
//   return service
//     .post('/countries', body)
//     .then(res => res.data)
//     .catch(errHandler)
// },
