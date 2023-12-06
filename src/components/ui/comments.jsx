import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'
import api from '../../api'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
    const { userId } = useParams()
    const [comments, setComments] = useState([])
    const { createComment } = useComments()
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data))
    }, [])
    const handleAdd = (data) => {
        createComment(data)
    }
    const handleRemove = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((comment) => comment.id !== id))
        })
    }
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])
    const renderCommentsList = () => {
        if (comments.length > 0) {
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
