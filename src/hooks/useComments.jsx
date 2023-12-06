import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import { useAuth } from '../hooks/useAuth'
import commentService from '../services/comment.service'

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
    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId)
            setComments(content)
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }
    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            userId: currentUser._id,
            created_at: Date.now()
        }
        try {
            const { content } = await commentService.createComment(comment)
            setComments((prevState) => [...prevState, content])
        } catch (e) {
            setError(e)
        }
    }
    useEffect(() => {
        getComments()
    }, [userId])
    useEffect(() => {
        if (error !== null) {
            toast(error.message)
            setError(null)
        }
    }, [error])

    return <CommentsContext.Provider value={{ comments, isLoading, createComment }}>{children}</CommentsContext.Provider>
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default CommentsProvider
