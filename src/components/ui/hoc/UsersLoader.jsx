import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getDataStatus, loadUsersList } from '../../../store/users'

const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataStatus())
    const dispatch = useDispatch()
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList())
        }
    }, [])

    if (dataStatus) {
        return children
    } else {
        return 'Loading...'
    }
}

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UsersLoader
