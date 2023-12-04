import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth()
    const location = useLocation()

    return currentUser
        ? children
        : <Navigate to={'/login'} state={{ from: location.pathname }} />
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default ProtectedRoute
