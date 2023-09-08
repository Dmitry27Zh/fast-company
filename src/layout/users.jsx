import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage/userPage'
import UsersListPage from '../components/page/usersListPage'
import Edit from './edit'

const Users = () => {
    const { id, edit } = useParams()

    if (edit) {
        return <Edit id={id}/>
    }

    if (id) {
        return <UserPage id={id}/>
    }

    return <UsersListPage />
}

export default Users
