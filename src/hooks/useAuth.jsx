import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import usersService from '../services/users.service'
import localStorageService from '../services/localStorage.service'
import { getRandomInteger } from '../utils'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext()
export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function signUp({ email, password, ...rest }) {
        const url = 'accounts:signUp'

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
            localStorageService.setTokens(data)

            const user = {
                _id: data.localId,
                email,
                rate: getRandomInteger(1, 5),
                completedMeetings: getRandomInteger(0, 200),
                image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            }
            await createUser(user)
        } catch (e) {
            const { code, message } = e.response.data.error

            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const error = { email: 'User with this email already exists' }
                    throw error
                }
            } else {
                setError(e)
            }
        }
    }
    async function signIn({ email, password }) {
        const url = 'accounts:signInWithPassword'

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
            localStorageService.setTokens(data)
            await loadUser()
        } catch (e) {
            const { code, message } = e.response.data.error

            if (code === 400) {
                if (message === 'INVALID_LOGIN_CREDENTIALS') {
                    throw new Error('Incorrect login or password')
                }
                if (message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
                    throw new Error('Too many attempts. Try later')
                }
            } else {
                setError(e)
            }
        }
    }
    function logOut() {
        localStorageService.removeAuthData()
        setCurrentUser(null)
        navigate('/')
    }
    async function createUser(data) {
        try {
            const { content } = await usersService.create(data)
            setCurrentUser(content)
        } catch (e) {
            setError(e)
        }
    }
    async function loadUser() {
        try {
            const { content } = await usersService.getById(localStorageService.getUserId())
            setCurrentUser(content)
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }
    async function updateUser(payload) {
        try {
            const { content } = await usersService.update(currentUser._id, payload)
            setCurrentUser((prevState) => ({ ...prevState, ...content }))
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
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            loadUser()
        } else {
            setIsLoading(false)
        }
    }, [])

    return <AuthContext.Provider value={{ signUp, signIn, logOut, currentUser, updateUser }}>{isLoading ? 'loading...' : children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default AuthProvider
