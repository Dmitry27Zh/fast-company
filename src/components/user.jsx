import React from 'react'

const User = (props) => {
  const { heads, _id, onDelete } = props
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
  const renderCell = (head) => {
    const data = props[head]
    const key = data._id ?? head

    return <td key={key}>{renderCellContent(data)}</td>
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
