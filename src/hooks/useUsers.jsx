import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usersService from '../services/users.service'

const UsersContext = React.createContext()

export const useUsers = () => {
    return useContext(UsersContext)
}

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    async function getUsers() {
        const { content } = await usersService.get()
        setUsers(content)
    }
    useEffect(() => {
        getUsers()
    }, [])

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
