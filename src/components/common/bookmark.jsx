import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getCurrentUser } from '../../store/users'

const Bookmark = ({ userId }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUser())
    const currentBookmarks = currentUser.bookmarks ?? []
    const done = currentBookmarks.includes(userId)
    let classes = 'bi bi-bookmark'
    classes += done ? '-fill' : ''
    const handleBookmark = () => {
        const newBookmarks = done
            ? currentBookmarks.filter((currentBoomark) => currentBoomark !== userId)
            : [...currentBookmarks, userId]
        dispatch(updateUser({ bookmarks: newBookmarks }))
    }

    return (
        <button type="button" onClick={handleBookmark}>
            <i className={classes}></i>
        </button>
    )
}

Bookmark.propTypes = {
    userId: PropTypes.string.isRequired
}

export default Bookmark
