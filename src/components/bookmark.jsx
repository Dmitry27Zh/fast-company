import React from 'react'

const Bookmark = ({ done }) => {
  let classes = 'bi bi-bookmark'
  classes += done ? '-fill' : ''

  return <i className={classes}></i>
}

export default Bookmark
