import React from 'react'
import Qualities from './qualities'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

const User = (props) => {
    const { heads, _id, onDelete, onBookmark } = props
    const renderCellContent = (data, key) => {
        if (Array.isArray(data) && 'color' in data[0]) {
            return <Qualities data={data}></Qualities>
        }

        if (key === 'bookmark') {
            return (
                <Bookmark
                    done={data}
                    id={_id}
                    onBookmark={onBookmark}
                ></Bookmark>
            )
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
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    heads: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default User
