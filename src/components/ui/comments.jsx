import React from 'react'
import { orderBy } from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
    const { comments, createComment, removeComment } = useComments()
    const handleAdd = (data) => {
        createComment(data)
    }
    const handleRemove = (id) => {
        removeComment(id)
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
