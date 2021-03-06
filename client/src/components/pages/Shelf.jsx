import React, { useState, useEffect } from 'react'
import api from '../../api'
import MainNavbar from '../MainNavbar'
import GroupCard from '../GroupCard'

export default function Shelf() {
  const [myMemberships, setMyMemberships] = useState([])

  let username = JSON.parse(localStorage.getItem('user')).username

  useEffect(() => {
    api.getMyMemberships().then(response => {
      setMyMemberships(response)
    })
  }, [])

  return (
    <div>
      <div className="App__right__header">
        <MainNavbar title={'Welcome to your shelf, ' + username + '!'} />
      </div>

      <div className=" card-columns" style={{ padding: '30px' }}>
        {myMemberships.length === 0 && (
          <GroupCard
            link={'/create-group'}
            background="rgba(171, 191, 163, 0.7)"
            bookCover="/BookCover.jpg"
            name="Click to create your first group"
            description="Here is the description of the group - f.e if you want to discuss specific or general topics - feel free!"
            group={{}}
          />
        )}

        {myMemberships.length > 0 && (
          <div>
            {myMemberships
              .sort(function(a, b) {
                var date1 = new Date(a._group.updated_at)
                var date2 = new Date(b._group.updated_at)

                if (date2 > date1) {
                  return 1
                } else if (date2 < date1) {
                  return -1
                }

                if (a._group.name < b._group.name) {
                  return -1
                } else if (a._group.name > b._group.name) {
                  return 1
                } else {
                  return 0
                }
              })
              .map((group, i) => (
                <div key={i}>
                  <GroupCard
                    link={'/group-detail/' + group._group._id}
                    background="white"
                    bookCover={group._group._book.coverPictureUrl}
                    name={group._group.name}
                    description={group._group.description}
                    group={group._group}
                  />
                </div>
              ))}
            <GroupCard
              link={'/create-group'}
              background="rgba(171, 191, 163, 0.2)"
              name="Click to create a new group"
              bookCover="/BookCover.jpg"
              description="Here is the description of the group - f.e if you want to discuss specific or general topics - feel free!"
              group={{}}
            />
          </div>
        )}
      </div>
    </div>
  )
}
