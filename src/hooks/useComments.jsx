import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}

const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    return <CommentsContext.Provider value={{ comments }}>{children}</CommentsContext.Provider>
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default CommentsProvider
