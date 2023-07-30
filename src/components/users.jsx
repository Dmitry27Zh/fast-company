import React from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { USERS_PROPS } from '../constants'

const Users = () => {
  const users = api.users.fetchAll()
  console.log(users)
  let heads = users.length !== 0 ? Object.keys(users[0]).filter((key) => !key.startsWith('_')) : USERS_PROPS
  heads = heads.slice(0, 5)

  const renderHeads = () => {
    return heads.map((head) => (
      <th scope="col" key={head}>
        {head}
      </th>
    ))
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
  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user.name}>
        {heads.map((head) => (
          <td key={head}>{renderCellContent(user[head])}</td>
        ))}
      </tr>
    ))
  }

  return (
    <>
      <span></span>
      <table className="table">
        <thead>
          <tr>{renderHeads()}</tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  )
}

export default Users
