import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

const UsersContext = React.createContext()

export const useUsers = () => {
    const [users, setUsers] = useState([])

    return useContext(UsersContext)
}

const UsersProvider = ({ children }) => {
    return <UsersContext.Provider>{children}</UsersContext.Provider>
}

UsersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UsersProvider
