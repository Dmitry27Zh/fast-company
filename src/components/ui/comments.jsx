import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from '../../store/comments'

const Comments = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])
    const isLoading = useSelector(getCommentsLoadingStatus())
    const comments = useSelector(getComments())
    const handleAdd = (data) => {
        dispatch(createComment({ data, pageId: userId }))
    }
    const handleRemove = (id) => {
        dispatch(removeComment({ id }))
    }
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])
    const renderCommentsList = () => {
        if (isLoading) {
            return 'Loading...'
        } else {
            return (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleAdd} />
                </div>
            </div>
            {renderCommentsList()}
        </>
    )
}

export default Comments
