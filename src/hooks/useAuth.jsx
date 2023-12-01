import React, { useContext } from 'react'
import PropTypes from 'prop-types'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    return <AuthContext.Provider>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.oneOf(PropTypes.node, PropTypes.arrayOf(PropTypes.node))
}

export default AuthProvider
