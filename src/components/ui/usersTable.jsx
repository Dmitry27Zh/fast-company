import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import TableHeader from '../common/table/tableHeader'
import TableBody from '../common/table/tableBody'
import Bookmark from '../common/bookmark'
import Qualities from './qualities/qualities'
import Table from '../common/table/table'
import { Link } from 'react-router-dom'
import Profession from './profession'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from '../../store/qualities'

const UsersTable = (props) => {
    const { users, currentSort, onSort, onBookmark, ...rest } = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    const heads = {
        name: {
            iter: 'name',
            value: 'Имя',
            component: ({ _id, name }) => (
                <Link to={`/users/${_id}`}>{name}</Link>
            )
        },
        profession: {
            value: 'Профессия',
            component: ({ profession }) => <Profession data={profession} />
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
            component: ({ _id, bookmark = false }) => (
                <Bookmark done={bookmark} onBookmark={() => onBookmark(_id)} />
            )
        },
        delete: {
            component: ({ _id }) => {
                return (
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => console.log('delete', _id)}
                    >
                        Delete
                    </button>
                )
            }
        }
    }

    return (
        <Table>
            <TableHeader
                heads={heads}
                currentSort={currentSort}
                onSort={onSort}
            />
            <TableBody data={users} heads={heads} {...rest} />
        </Table>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    currentSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default UsersTable
