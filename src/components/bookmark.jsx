import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ done, id, onBookmark }) => {
    let classes = 'bi bi-bookmark'
    classes += done ? '-fill' : ''

    return (
        <button type="button" onClick={() => onBookmark(id)}>
            <i className={classes}></i>
        </button>
    )
}

Bookmark.propTypes = {
    done: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default Bookmark
