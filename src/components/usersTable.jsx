import React from 'react'
import { cancelCamelCase, capitalize } from '../utils'
import User from './user'
import PropTypes from 'prop-types'

const UsersTable = (props) => {
    const { heads, users, onDelete, onBookmark } = props
    const usersCount = users.length

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
        onDelete(id)
    }
    const handleBookmark = (id) => {
        onBookmark(id)
    }

    const renderUsers = () => {
        return (
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
    return renderTable()
}

UsersTable.propTypes = {
    users: PropTypes.array
}

export default UsersTable
