import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { paginate } from '../../../utils'
import UsersTable from '../../ui/usersTable'
import Status from '../../ui/status'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import _ from 'lodash'
import Search from '../../search'
import { useDispatch, useSelector } from 'react-redux'
import { getProfessions, getProfessionsLoadingStatus, loadProfessionsList } from '../../../store/professions'
import { loadQualitiesList } from '../../../store/qualities'
import { getCurrentUserId, getUsersList } from '../../../store/users'

const UsersListPage = () => {
    const currentUserId = useSelector(getCurrentUserId())
    const users = useSelector(getUsersList())
    const professions = useSelector(getProfessions())
    const isProfessionsLoading = useSelector(getProfessionsLoadingStatus())
    const [selectedProfession, setSelectedProfession] = useState()
    const [currentPage, setCurrentPage] = useState('1')
    const [sortBy, setSortBy] = useState({
        iter: null,
        order: null
    })
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        setCurrentPage('1')
    }, [selectedProfession, search])
    useEffect(() => {
        dispatch(loadProfessionsList())
        dispatch(loadQualitiesList())
    }, [])

    const searchUsers = () =>
        users.filter(({ name }) => new RegExp(search, 'i').test(name))
    const filterUsers = () => {
        const result = selectedProfession
            ? searchedUsers.filter((user) => {
                return (
                    JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProfession)
                )
            })
            : searchedUsers

        return result.filter((user) => user._id !== currentUserId)
    }
    const sortUsers = () =>
        _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
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
        setSearch('')
    }
    const handleFilterCancel = () => {
        setSelectedProfession()
    }
    const handleBookmark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
            }

            return user
        })

        console.log(newUsers)
    }
    const handleSort = (newSortBy) => {
        setSortBy(newSortBy)
    }
    const handleSearch = (value) => {
        setSelectedProfession()
        setSearch(value)
    }
    const renderTable = () => {
        if (usersToRenderCount !== 0) {
            return (
                <UsersTable
                    users={usersToRender}
                    currentSort={sortBy}
                    onBookmark={handleBookmark}
                    onSort={handleSort}
                />
            )
        }
    }

    return (
        <div className="d-flex">
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                    isLoading={isProfessionsLoading}
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
                <Search search={search} onSearch={handleSearch} />
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

export default UsersListPage
