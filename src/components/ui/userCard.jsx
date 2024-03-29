import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProfessionById } from '../../store/professions'
import { getCurrentUserId } from '../../store/users'

const UserCard = ({ user }) => {
    const currentUserId = useSelector(getCurrentUserId())
    const profession = useSelector(getProfessionById(user.profession))
    const professionName = profession?.name

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUserId === user._id && (
                    <Link
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        to="edit"
                    >
                        <i className="bi bi-gear"></i>
                    </Link>
                )}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        className="rounded-circle"
                        src={user.image}
                        width="150"
                        alt="avatar"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {professionName || '...'}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.object
}

export default UserCard
