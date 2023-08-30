import React from 'react'
import { cancelCamelCase, capitalize } from '../utils'
import User from './user'
import PropTypes from 'prop-types'

const UsersTable = (props) => {
    const { heads, users, currentSort, onDelete, onBookmark, onSort } = props
    const handleSort = (name) => {
        const order = name === currentSort.iteratee && currentSort.order === 'asc' ? 'desc' : 'asc'
        onSort({ iteratee: name, order })
    }

    const handleDelete = (id) => {
        onDelete(id)
    }
    const handleBookmark = (id) => {
        onBookmark(id)
    }

    return <table className="table">
        <thead>
            <tr>
                {heads.map((head) => (
                    <th onClick={() => handleSort(head)} key={head} scope="col" role='button'>
                        {capitalize(cancelCamelCase(head))}
                    </th>
                ))}
                <th></th>
            </tr>
        </thead>
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
