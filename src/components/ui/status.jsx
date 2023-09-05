import React from 'react'
import PropTypes from 'prop-types'

const Status = ({ usersCount }) => {
    let classes = 'badge bg-'
    classes += usersCount === 0 ? 'danger' : 'primary'
    const LongWord = {
        LAST_DIGITS: [2, 3, 4],
        EXCEPTIONS: [12, 13, 14]
    }
    const phrase =
        LongWord.LAST_DIGITS.includes(usersCount % 10) &&
        !LongWord.EXCEPTIONS.includes(usersCount)
            ? 'человека тусанут'
            : 'человек тусанет'
    const message =
        usersCount === 0
            ? 'Никто с тобой не тусанет '
            : `${usersCount} ${phrase} с тобой сегодня`

    return (
        <h3>
            <span className={classes}>{message}</span>
        </h3>
    )
}

Status.propTypes = {
    usersCount: PropTypes.number.isRequired
}

export default Status
