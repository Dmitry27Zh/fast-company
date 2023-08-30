import React, { useEffect, useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { paginate } from '../utils'
import UsersTable from './usersTable'
import Status from './status'
import Pagination from './pagination'
import GroupList from './groupList'
import { USERS_PROPS } from '../constants'

const Users = () => {
    const [users, setUsers] = useState()
    const [professions, setProfessions] = useState({})
    const [selectedProfession, setSelectedProfession] = useState()
    const [currentPage, setCurrentPage] = useState('1')
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])
    useEffect(() => {
        setCurrentPage('1')
    }, [selectedProfession])

    if (!users) {
        return
    }

    const usersCount = users.length
    let heads =
        usersCount !== 0
            ? Object.keys(users[0]).filter((key) => !key.startsWith('_'))
            : USERS_PROPS
    heads = heads.slice(0, 6)
    const filteredUsers = selectedProfession
        ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProfession))
        : users
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

    return (
        <div className='d-flex'>
            <div className='d-flex flex-column flex-shrink-0 p-3'>
                <GroupList items={professions} selectedItem={selectedProfession} onSelect={handleProfessionSelect} />
                <button className='btn btn-secondary mt-2' type='button' onClick={handleFilterCancel}>Очистить</button>
            </div>
            <div className='d-flex flex-column'>
                <Status usersCount={filteredUsersCount} />
                <UsersTable heads={heads} users={usersToRender} onDelete={handleDelete} onBookmark={handleBookmark} />
                <div className='d-flex justify-content-center'>
                    <Pagination
                        pagesCount={pagesCount}
                        currentPage={currentPage}
                        onPageChange={handleCurrentPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Users
