import React from 'react'
import PropTypes from 'prop-types'

const Badge = ({ _id, name, color }) => {
    let classes = 'badge m-2 '
    classes += `text-bg-${color}`

    return (
        <span className={classes} key={_id}>
            {name}
        </span>
    )
}

Badge.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default Badge
