import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import usersService from '../services/users.service'
import localStorageService from '../services/localStorage.service'

const AuthContext = React.createContext()
const httpAuth = axios.create()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [error, setError] = useState(null)

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
            localStorageService.setTokens(data)
            const user = { _id: data.localId, email, ...rest }
            await createUser(user)
        } catch (e) {
            setError(e)
        }
    }
    async function createUser(data) {
        try {
            const { content } = await usersService.create(data)
            setCurrentUser(content)
        } catch (e) {
            setError(e)
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error.message)
            setError(null)
        }
    }, [error])

    return <AuthContext.Provider value={{ signUp, currentUser }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default AuthProvider
