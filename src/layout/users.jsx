import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditPage from '../components/page/editPage/editPage'
import UsersProvider from '../hooks/useUsers'

const Users = () => {
    const { userId, edit } = useParams()
    const render = () => {
        if (edit) {
            return <EditPage id={userId} />
        } else if (userId) {
            return <UserPage id={userId} />
        } else {
            return <UsersListPage />
        }
    }

    return <UsersProvider>{render()}</UsersProvider>
}

export default Users
