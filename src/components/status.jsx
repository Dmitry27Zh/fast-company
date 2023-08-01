import React from 'react'

const Status = ({ quantity }) => {
  let classes = 'badge bg-'
  classes += quantity === 0 ? 'danger' : 'primary'
  const LongWord = {
    LAST_DIGITS: [2, 3, 4],
    EXCEPTIONS: [12, 13, 14],
  }
  let phrase =
    LongWord.LAST_DIGITS.includes(quantity % 10) && !LongWord.EXCEPTIONS.includes(quantity)
      ? 'человека тусанут'
      : 'человек тусанет'
  let message = quantity === 0 ? 'Никто с тобой не тусанет ' : `${quantity} ${phrase} с тобой сегодня`

  return (
    <h3>
      <span className={classes}>{message}</span>
    </h3>
  )
}

export default Status
