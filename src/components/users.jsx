import React, { useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { USERS_PROPS } from '../constants'
import { cancelCamelCase, capitalize } from '../utils'
import User from './user'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  let heads = users.length !== 0 ? Object.keys(users[0]).filter((key) => !key.startsWith('_')) : USERS_PROPS
  heads = heads.slice(0, 5)

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
  const renderUsers = () => {
    return (
      <tbody className="table-group-divider">
        {users.map((user) => (
          <User key={user._id} heads={heads} onDelete={handleDelete} {...user}></User>
        ))}
      </tbody>
    )
  }
  const renderInfo = () => {
    const length = users.length
    let classes = 'badge bg-'
    classes += length === 0 ? 'danger' : 'primary'
    const LongWord = {
      LAST_DIGITS: [2, 3, 4],
      EXCEPTIONS: [12, 13, 14],
    }
    let phrase =
      LongWord.LAST_DIGITS.includes(length % 10) && !LongWord.EXCEPTIONS.includes(length)
        ? 'человека тусанут'
        : 'человек тусанет'
    let message = length === 0 ? 'Никто с тобой не тусанет ' : `${length} ${phrase} с тобой сегодня`

    return (
      <h3>
        <span className={classes}>{message}</span>
      </h3>
    )
  }
  const renderTable = () => {
    if (users.length !== 0) {
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
      {renderInfo()}
      {renderTable()}
    </>
  )
}

export default Users
