import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const location = useLocation()

    return isLoggedIn
        ? children
        : <Navigate to={'/login'} state={{ from: location.pathname }} />
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default ProtectedRoute
