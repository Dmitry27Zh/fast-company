import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth()

    return currentUser ? children : <Navigate to='/login' />
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default ProtectedRoute
