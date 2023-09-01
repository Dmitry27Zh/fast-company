import React from 'react'
import { useParams } from 'react-router-dom'
import User from '../components/user'
import UsersList from '../components/usersList'

const Users = () => {
    const { id } = useParams()

    if (id) {
        return <User id={id}/>
    }

    return <UsersList />
}

export default Users
