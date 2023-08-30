import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const UsersTable = (props) => {
    const { users, currentSort, onSort, ...rest } = props
    const handleSort = (iter) => {
        const order = iter === currentSort.iter && currentSort.order === 'asc' ? 'desc' : 'asc'
        onSort({ iter, order })
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
        <TableBody data={users} heads={heads} {...rest} />
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
