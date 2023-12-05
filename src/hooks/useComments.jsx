import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}

const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { userId } = useParams()
    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now()
        }
    }

    return <CommentsContext.Provider value={{ comments, createComment }}>{children}</CommentsContext.Provider>
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default CommentsProvider
