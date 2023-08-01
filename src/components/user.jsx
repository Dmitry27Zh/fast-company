import React from 'react'
import Qualities from './qualities'
import Bookmark from './bookmark'

const User = (props) => {
  const { heads, _id, onDelete } = props
  const renderCellContent = (data, key) => {
    if (Array.isArray(data) && 'color' in data[0]) {
      return <Qualities data={data}></Qualities>
    }

    if (key === 'bookmark') {
      return <Bookmark done={data}></Bookmark>
    }

    const renderItem = (item) => {
      if (typeof item !== 'object') {
        return item
      }

      return `${item.name} `
    }

    return [].concat(data).map(renderItem)
  }
  const renderCell = (head) => {
    const data = props[head]
    const key = data._id ?? head

    return <td key={key}>{renderCellContent(data, key)}</td>
  }

  return (
    <tr key={_id}>
      {heads.map(renderCell)}
      <td>
        <button className="btn btn-danger" type="button" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default User
