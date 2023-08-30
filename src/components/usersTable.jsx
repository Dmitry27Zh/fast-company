import React from 'react'
import User from './user'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'

const UsersTable = (props) => {
    const { heads, users, currentSort, onDelete, onBookmark, onSort } = props
    const handleSort = (iter) => {
        const order = iter === currentSort.iter && currentSort.order === 'asc' ? 'desc' : 'asc'
        onSort({ iter, order })
    }

    const handleDelete = (id) => {
        onDelete(id)
    }
    const handleBookmark = (id) => {
        onBookmark(id)
    }

    return <table className="table">
        <TableHeader heads={heads} onSort={handleSort} />
        <tbody className="table-group-divider">
            {users.map((user) => (
                <User
                    key={user._id}
                    heads={heads}
                    onDelete={handleDelete}
                    onBookmark={handleBookmark}
                    {...user}
                ></User>
            ))}
        </tbody>
    </table>
}

UsersTable.propTypes = {
    heads: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    currentSort: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
}

export default UsersTable
