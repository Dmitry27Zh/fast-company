import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ done, onBookmark }) => {
    let classes = 'bi bi-bookmark'
    classes += done ? '-fill' : ''

    return (
        <button type="button" onClick={() => onBookmark()}>
            <i className={classes}></i>
        </button>
    )
}

Bookmark.propTypes = {
    done: PropTypes.bool.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default Bookmark
