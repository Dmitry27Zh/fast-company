import React, { useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { USERS_PROPS } from '../constants'
import { cancelCamelCase, capitalize } from '../utils'
import User from './user'
import Status from './status'
import Pagination from './pagination'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const [currentPage, setCurrentPage] = useState(1)
  const usersCount = users.length
  const pageSize = 4
  const pagesCount = Math.ceil(usersCount / pageSize)
  let heads = usersCount !== 0 ? Object.keys(users[0]).filter((key) => !key.startsWith('_')) : USERS_PROPS
  heads = heads.slice(0, 6)
  const usersOnCurrentPage = users.slice().splice((currentPage - 1) * pageSize, pageSize)

  const renderHeads = () => {
    return (
      <thead>
        <tr>
          {heads.map((head) => (
            <th scope="col" key={head}>
              {capitalize(cancelCamelCase(head))}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
    )
  }

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id))
  }
  const handleBookmark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark
      }

      return user
    })
    setUsers(newUsers)
  }
  const renderUsers = () => {
    return (
      <tbody className="table-group-divider">
        {usersOnCurrentPage.map((user) => (
          <User key={user._id} heads={heads} onDelete={handleDelete} onBookmark={handleBookmark} {...user}></User>
        ))}
      </tbody>
    )
  }
  const renderTable = () => {
    if (usersCount !== 0) {
      return (
        <table className="table">
          {renderHeads()}
          {renderUsers()}
        </table>
      )
    }
  }

  return (
    <>
      <Status usersCount={usersCount} />
      {renderTable()}
      <Pagination pagesCount={pagesCount} currentPage={currentPage} />
    </>
  )
}

export default Users
