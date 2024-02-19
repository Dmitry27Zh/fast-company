import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import UserPage from '../components/page/userPage/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditPage from '../components/page/editPage/editPage'
import UsersProvider from '../hooks/useUsers'
import UsersLoader from '../components/ui/hoc/UsersLoader'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'

const Users = () => {
    const { userId, edit } = useParams()
    const currentUserId = useSelector(getCurrentUserId())
    const render = () => {
        if (edit) {
            return userId === currentUserId ? <EditPage id={userId} /> : <Navigate to={`/users/${currentUserId}/edit`} />
        } else if (userId) {
            return <UserPage id={userId} />
        } else {
            return <UsersListPage />
        }
    }

    return <UsersLoader>
        <UsersProvider>{render()}</UsersProvider>
    </UsersLoader>
}

export default Users
