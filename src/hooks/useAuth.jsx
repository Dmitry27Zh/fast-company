import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const AuthContext = React.createContext()
const httpAuth = axios.create()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    async function signUp({ email, password }) {
        const key = 'AIzaSyC5UlJfJXLHeeyYZRAL3fKf7GF4Efhf_PU'
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
        const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
        console.log(data)
    }

    return <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default AuthProvider
