import React, { useState, useEffect } from 'react'
import { Input, Button } from 'reactstrap'
import api from '../../api'

import { Link, NavLink } from 'react-router-dom'
import MainNavbar from '../MainNavbar'

export default function CreateGroup(props) {
  const [stateSearch, setStateSearch] = useState([])

  const [stateInput, setStateInput] = useState({
    searchString: '',
    type: 'group',
  })

  useEffect(() => {
    let filtered = []
    if (stateInput.type === 'group')
      api.getGroups().then(response => {
        console.log(response)
        filtered = response.filter(group =>
          group.name
            .toUpperCase()
            .includes(stateInput.searchString.toUpperCase())
        )
        console.log(filtered)
        setStateSearch(filtered)
      })
    if (stateInput.type === 'book')
      api.getBooks().then(response => {
        console.log(response)
        filtered = response.filter(book =>
          book.title
            .toUpperCase()
            .includes(stateInput.searchString.toUpperCase())
        )
        setStateSearch(filtered)
      })
  }, [stateInput])

  function onButtonClick() {
    setStateInput({
      ...stateInput,
      type: stateInput.type === 'group' ? 'book' : 'group',
    })
  }

  function handleOnChange(e) {
    console.log('OnChange: ', e.target.value)
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setStateInput({
      ...stateInput,
      [e.target.name]: value,
    })
  }

  function disabled(e) {
    console.log('disabeld', e)
  }
  return (
    <div>
      <div className="App__right__header" style={{ padding: '15px 30px' }}>
        <MainNavbar title="Search a Group" />
      </div>
      <div className="App__right__body container">
        {/* <div>
          <pre>{JSON.stringify(stateInput, null, 2)}</pre>
          <pre>{JSON.stringify(stateSearch, null, 2)}</pre>
       </div> */}
        <Button
          disabled={stateInput.type === 'book' ? true : false}
          onClick={onButtonClick}
          className={stateInput.type === 'book' ? 'active' : ''}
        >
          Book
        </Button>
        <Button
          disabled={stateInput.type === 'group' ? true : false}
          onClick={onButtonClick}
          className={stateInput.type === 'group' ? 'active' : ''}
        >
          Group
        </Button>
        <Input name="searchString" onChange={handleOnChange} />
        <span className="App__right__circle" />
      </div>
      <div>
        <h1>Result</h1>
        {stateSearch.map((result, i) => (
          <li key={i}>
            <Link to={'/result-details/' + result._id}>
              {result.name || result.title}
            </Link>
          </li>
        ))}
      </div>
    </div>
  )
}
