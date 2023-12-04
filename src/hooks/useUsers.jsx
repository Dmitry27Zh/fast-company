import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usersService from '../services/users.service'
import { toast } from 'react-toastify'
import { useQualities } from './useQualities'
import { useProfessions } from './useProfessions'
import { useAuth } from './useAuth'

const UsersContext = React.createContext()

export const useUsers = () => {
    return useContext(UsersContext)
}

const UsersProvider = ({ children }) => {
    const qualities = useQualities()
    const professions = useProfessions()
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { currentUser } = useAuth()
    async function getUsers() {
        try {
            const { content } = await usersService.get()
            const transformedContent = content.map((item) => {
                if ('qualities' in item) {
                    item.qualities = item.qualities.map((qualityId) => {
                        return qualities.find((quality) => quality._id === qualityId)
                    })
                }
                if ('profession' in item) {
                    item.profession = professions.find((professions) => professions._id === item.profession)
                }

                return item
            })
            setUsers(transformedContent)
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
        if (currentUser) {
            getUsers()
        }
    }, [currentUser])
    useEffect(() => {
        if (error !== null) {
            toast(error.message)
            setError(null)
        }
    }, [error])

    return (
        <UsersContext.Provider value={{ users, getUserById }}>{isLoading ? 'loading...' : children}</UsersContext.Provider>
    )
}

UsersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UsersProvider
