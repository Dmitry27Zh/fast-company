import React from 'react'
import User from './user'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'

const UsersTable = (props) => {
    const { users, currentSort, onDelete, onBookmark, onSort } = props
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
    const heads = {
        name: {
            iter: 'name',
            value: 'Имя'
        },
        profession: {
            iter: 'profession.name',
            value: 'Профессия'
        },
        qualities: {
            value: 'Качества'
        },
        completedMeetings: {
            iter: 'completedMeetings',
            value: 'Количество встреч'
        },
        rate: {
            iter: 'rate',
            value: 'Рейтинг'
        },
        bookmark: {
            value: 'Избранное'
        }
    }

    return <table className="table">
        <TableHeader heads={heads} onSort={handleSort} />
        <tbody className="table-group-divider">
            {users.map((user) => (
                <User
                    key={user._id}
                    heads={Object.keys(heads)}
                    onDelete={handleDelete}
                    onBookmark={handleBookmark}
                    {...user}
                ></User>
            ))}
        </tbody>
    </table>
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    currentSort: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
}

export default UsersTable
