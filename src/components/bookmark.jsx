import React from 'react'

const Bookmark = ({ done, id, onBookmark }) => {
  let classes = 'bi bi-bookmark'
  classes += done ? '-fill' : ''

  return (
    <button type="button" onClick={() => onBookmark(id)}>
      <i className={classes}></i>
    </button>
  )
}

export default Bookmark
