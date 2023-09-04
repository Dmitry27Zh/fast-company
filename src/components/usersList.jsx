import React, { useEffect, useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { paginate } from '../utils'
import UsersTable from './usersTable'
import Status from './status'
import Pagination from './pagination'
import GroupList from './groupList'
import _ from 'lodash'
import Search from './search'

const UsersList = () => {
    const [users, setUsers] = useState()
    const [professions, setProfessions] = useState({})
    const [selectedProfession, setSelectedProfession] = useState()
    const [currentPage, setCurrentPage] = useState('1')
    const [sortBy, setSortBy] = useState({
        iter: null,
        order: null
    })
    const [search, setSearch] = useState('')
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])
    useEffect(() => {
        setCurrentPage('1')
    }, [selectedProfession, search])

    if (!users) {
        return 'Loading...'
    }

    const searchUsers = () => users.filter(({ name }) => new RegExp(search, 'i').test(name))
    const filterUsers = () => {
        return selectedProfession
            ? searchedUsers.filter(
                (user) => {
                    return JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProfession)
                }
            )
            : searchedUsers
    }
    const sortUsers = () => _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
    const paginateUsers = () => paginate(sortedUsers, pageSize, currentPage)
    const searchedUsers = searchUsers()
    const filteredUsers = filterUsers()
    const filteredUsersCount = filteredUsers.length
    const sortedUsers = sortUsers()
    const pageSize = 4
    const pagesCount = Math.ceil(filteredUsersCount / pageSize)
    const usersToRender = paginateUsers()
    const usersToRenderCount = usersToRender.length
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
    const handleSort = (newSortBy) => {
        setSortBy(newSortBy)
    }
    const handleSearch = (event) => {
        setSelectedProfession()
        setSearch(event.target.value.trim())
    }
    const renderTable = () => {
        if (usersToRenderCount !== 0) {
            return (
                <UsersTable
                    users={usersToRender}
                    currentSort={sortBy}
                    onDelete={handleDelete}
                    onBookmark={handleBookmark}
                    onSort={handleSort}
                />
            )
        }
    }
    const renderSearch = () => {
        return <Search onSearch={handleSearch}/>
    }

    return (
        <div className="d-flex">
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                    items={professions}
                    selectedItem={selectedProfession}
                    onSelect={handleProfessionSelect}
                />
                <button
                    className="btn btn-secondary mt-2"
                    type="button"
                    onClick={handleFilterCancel}
                >
                    Очистить
                </button>
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <Status usersCount={filteredUsersCount} />
                {renderSearch()}
                {renderTable()}
                <div className="d-flex justify-content-center">
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

export default UsersList
