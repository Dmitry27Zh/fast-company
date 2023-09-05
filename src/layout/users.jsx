import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage/userPage'
import UsersListPage from '../components/page/usersListPage'

const Users = () => {
    const { id } = useParams()

    if (id) {
        return <UserPage id={id}/>
    }

    return <UsersListPage />
}

export default Users
