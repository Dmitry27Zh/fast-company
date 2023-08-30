import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import Bookmark from './bookmark'
import Qualities from './qualities'

const UsersTable = (props) => {
    const { users, currentSort, onSort, onBookmark, onDelete, ...rest } = props

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
            value: 'Качества',
            component: ({ qualities }) => <Qualities data={qualities} />
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
            value: 'Избранное',
            component: ({ _id, bookmark }) => <Bookmark done={bookmark} onBookmark={() => onBookmark(_id)}/>
        },
        delete: {
            component: ({ _id }) => {
                return <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            }
        }
    }

    return <table className="table">
        <TableHeader heads={heads} currentSort={currentSort} onSort={onSort} />
        <TableBody data={users} heads={heads} {...rest} />
    </table>
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    currentSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default UsersTable
