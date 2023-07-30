import React, { useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { USERS_PROPS } from '../constants'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  let heads = users.length !== 0 ? Object.keys(users[0]).filter((key) => !key.startsWith('_')) : USERS_PROPS
  heads = heads.slice(0, 5)

  const renderHeads = () => {
    if (users.length !== 0) {
      return (
        <tr>
          {heads.map((head) => (
            <th scope="col" key={head}>
              {head}
            </th>
          ))}
        </tr>
      )
    }

    return <></>
  }
  const renderBadge = ({ name, color }) => {
    let classes = 'badge m-2 '
    classes += `text-bg-${color}`

    return (
      <span className={classes} key={name}>
        {name}
      </span>
    )
  }
  const renderCellContent = (data) => {
    const renderItem = (item) => {
      if (typeof item !== 'object') {
        return item
      }

      if ('color' in item) {
        return renderBadge(item)
      }

      return `${item.name} `
    }

    return [].concat(data).map(renderItem)
  }
  const handleDelete = (userToDelete) => {
    setUsers(users.filter((user) => user._id !== userToDelete._id))
  }
  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user.name}>
        {heads.map((head) => (
          <td key={head}>{renderCellContent(user[head])}</td>
        ))}
        <td>
          <button className="btn btn-danger" type="button" onClick={() => handleDelete(user)}>
            Delete
          </button>
        </td>
      </tr>
    ))
  }
  const renderInfo = () => {
    const length = users.length
    let classes = 'badge bg-'
    classes += length === 0 ? 'danger' : 'primary'
    const LongWord = {
      LAST_DIGITS: [2, 3, 4],
      EXCEPTIONS: [12, 13, 14],
    }
    let word =
      LongWord.LAST_DIGITS.includes(length % 10) && !LongWord.EXCEPTIONS.includes(length) ? 'человека' : 'человек'
    let message = length === 0 ? 'Никто с тобой не тусанет ' : `${length} ${word} тусанет с тобой сегодня`

    return (
      <h3>
        <span className={classes}>{message}</span>
      </h3>
    )
  }

  return (
    <>
      {renderInfo()}
      <table className="table">
        <thead>{renderHeads()}</thead>
        <tbody className="table-group-divider">{renderUsers()}</tbody>
      </table>
    </>
  )
}

export default Users
