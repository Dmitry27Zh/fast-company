import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usersService from '../services/users.service'
import { toast } from 'react-toastify'

const UsersContext = React.createContext()

export const useUsers = () => {
    return useContext(UsersContext)
}

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    async function getUsers() {
        try {
            const { content } = await usersService.get()
            setUsers(content)
        } catch (e) {
            setError(e)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        if (error !== null) {
            toast(error.message)
            setError(null)
        }
    }, [error])

    return (
        <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
    )
}

UsersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UsersProvider
