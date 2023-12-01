import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

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
    function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
        const expiresDate = new Date().getTime() + expiresIn * 1000
        localStorage.setItem(AuthKey.TOKEN, idToken)
        localStorage.setItem(AuthKey.REFRESH, refreshToken)
        localStorage.setItem(AuthKey.EXPIRES, expiresDate)
    }
    async function signUp({ email, password }) {
        const key = 'AIzaSyC5UlJfJXLHeeyYZRAL3fKf7GF4Efhf_PU'
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
        const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
        setTokens(data)
    }

    return <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default AuthProvider
