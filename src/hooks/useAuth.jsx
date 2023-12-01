import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import usersService from '../services/users.service'

const AuthContext = React.createContext()
const httpAuth = axios.create()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthKey = {
    TOKEN: 'jwt_token',
    REFRESH: 'jwt_refresh_token',
    EXPIRES: 'jwt_expires'
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [error, setError] = useState(null)
    function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
        const expiresDate = new Date().getTime() + expiresIn * 1000
        localStorage.setItem(AuthKey.TOKEN, idToken)
        localStorage.setItem(AuthKey.REFRESH, refreshToken)
        localStorage.setItem(AuthKey.EXPIRES, expiresDate)
    }
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
            setTokens(data)
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
