import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usersService from '../services/users.service'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'

const UsersContext = React.createContext()

export const useUsers = () => {
    return useContext(UsersContext)
}

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { currentUser } = useAuth()
    async function getUsers() {
        try {
            const { content } = await usersService.get()
            setUsers(content)
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }
    function getUserById(id) {
        return users.find((user) => user._id === id)
    }
    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        if (!isLoading && currentUser) {
            setUsers((prevState) =>
                prevState.map((user) => {
                    if (user._id === currentUser._id) {
                        return currentUser
                    } else {
                        return user
                    }
                })
            )
        }
    }, [currentUser])
    useEffect(() => {
        if (error !== null) {
            toast(error.message)
            setError(null)
        }
    }, [error])

    return (
        <UsersContext.Provider value={{ users, getUserById }}>
            {isLoading ? 'loading...' : children}
        </UsersContext.Provider>
    )
}

UsersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UsersProvider
