import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import { displayDate } from '../../../utils/displayDate'

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onRemove
}) => {
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        api.users
            .getUserById(userId)
            .then((data) => {
                setUser(data)
            })
            .finally(() => setIsLoading(false))
    }, [])
    const renderContent = () => {
        if (isLoading || !user) {
            return 'Loading...'
        }

        return (
            <div className="col">
                <div className="d-flex flex-start">
                    <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        width="65"
                        height="65"
                        alt="avatar"
                    />
                </div>
                <div className="flex-grow-1 flex-shrink-1">
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                                {user.name}
                                <span className="small">
                                    {displayDate(created)}
                                </span>
                            </p>
                            <button
                                className="btn btn-sm text-primary d-flex align-items-center"
                                onClick={() => onRemove(id)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <p className="small mb-0">{content}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">{renderContent()}</div>
        </div>
    )
}

Comment.propTypes = {
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string
}

export default Comment
