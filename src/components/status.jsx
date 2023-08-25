import React from 'react'

const Status = ({ usersCount }) => {
  let classes = 'badge bg-'
  classes += usersCount === 0 ? 'danger' : 'primary'
  const LongWord = {
    LAST_DIGITS: [2, 3, 4],
    EXCEPTIONS: [12, 13, 14],
  }
  let phrase =
    LongWord.LAST_DIGITS.includes(usersCount % 10) && !LongWord.EXCEPTIONS.includes(usersCount)
      ? 'человека тусанут'
      : 'человек тусанет'
  let message = usersCount === 0 ? 'Никто с тобой не тусанет ' : `${usersCount} ${phrase} с тобой сегодня`

  return (
    <h3>
      <span className={classes}>{message}</span>
    </h3>
  )
}

export default Status
