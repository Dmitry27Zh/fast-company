import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import UserPage from '../components/page/userPage/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditPage from '../components/page/editPage/editPage'
import UsersProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

const Users = () => {
    const { userId, edit } = useParams()
    const { currentUser } = useAuth()
    const render = () => {
        if (edit) {
            return userId === currentUser._id ? <EditPage id={userId} /> : <Navigate to={`/users/${currentUser._id}/edit`} />
        } else if (userId) {
            return <UserPage id={userId} />
        } else {
            return <UsersListPage />
        }
    }

    return <UsersProvider>{render()}</UsersProvider>
}

export default Users
