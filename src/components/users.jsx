import React, { useEffect, useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { USERS_PROPS } from '../constants'
import { cancelCamelCase, capitalize, paginate } from '../utils'
import User from './user'
import Status from './status'
import Pagination from './pagination'
import GroupList from './groupList'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const [professions, setProfessions] = useState({})
    const [selectedProfession, setSelectedProfession] = useState()
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
    const [currentPage, setCurrentPage] = useState('1')
    const usersCount = users.length
    let heads =
        usersCount !== 0
            ? Object.keys(users[0]).filter((key) => !key.startsWith('_'))
            : USERS_PROPS
    heads = heads.slice(0, 6)
    const filteredUsers = selectedProfession ? users.filter((user) => user.profession === selectedProfession) : users
    const filteredUsersCount = filteredUsers.length
    const pageSize = 4
    const pagesCount = Math.ceil(filteredUsersCount / pageSize)
    const usersToRender = paginate(filteredUsers, pageSize, currentPage)
    const handleCurrentPageChange = (page) => {
        setCurrentPage(page)
    }
    const handleProfessionSelect = (profession) => {
        setSelectedProfession(profession)
    }
    const handleFilterCancel = () => {
        setSelectedProfession()
    }

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
        setUsers(users.filter((user) => user._id !== id))
    }
    const handleBookmark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
            }

            return user
        })
        setUsers(newUsers)
    }
    const renderUsers = () => {
        return (
            <tbody className="table-group-divider">
                {usersToRender.map((user) => (
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

    return (
        <>
            <GroupList items={professions} selectedItem={selectedProfession} onSelect={handleProfessionSelect} />
            <button className='btn btn-secondary mt-2' type='button' onClick={handleFilterCancel}>Очистить</button>
            <Status usersCount={filteredUsersCount} />
            {renderTable()}
            <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                onPageChange={handleCurrentPageChange}
            />
        </>
    )
}

export default Users
