import React, { useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { USERS_PROPS } from '../constants'
import { cancelCamelCase, capitalize } from '../utils'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  let heads = users.length !== 0 ? Object.keys(users[0]).filter((key) => !key.startsWith('_')) : USERS_PROPS
  heads = heads.slice(0, 5)

  const renderHeads = () => {
    return (
      <tr>
        {heads.map((head) => (
          <th scope="col" key={head}>
            {capitalize(cancelCamelCase(head))}
          </th>
        ))}
        <th></th>
      </tr>
    )
  }
  const renderBadge = ({ name, color, _id }) => {
    let classes = 'badge m-2 '
    classes += `text-bg-${color}`

    return (
      <span className={classes} key={_id}>
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
  const renderCell = (user, head) => {
    const data = user[head]
    const key = data._id ?? head

    return <td key={key}>{renderCellContent(data)}</td>
  }
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id))
  }
  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user._id}>
        {heads.map((head) => renderCell(user, head))}
        <td>
          <button className="btn btn-danger" type="button" onClick={() => handleDelete(user._id)}>
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
          <thead>{renderHeads()}</thead>
          <tbody className="table-group-divider">{renderUsers()}</tbody>
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
