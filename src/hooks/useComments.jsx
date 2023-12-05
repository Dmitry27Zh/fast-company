import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { nanoid } from 'nanoid'

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}

const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { userId } = useParams()
    const { currentUser } = useAuth()
    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            userId: currentUser._id,
            created_at: Date.now()
        }
    }

    return <CommentsContext.Provider value={{ comments, createComment }}>{children}</CommentsContext.Provider>
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default CommentsProvider
