import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditPage from '../components/page/editPage/editPage'

const Users = () => {
    const { id, edit } = useParams()
    const render = () => {
        if (edit) {
            return <EditPage id={id} />
        } else if (id) {
            return <UserPage id={id} />
        } else {
            return <UsersListPage />
        }
    }

    return render()
}

export default Users
