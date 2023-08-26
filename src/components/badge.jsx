import React from 'react'

const Badge = ({ _id, name, color }) => {
    let classes = 'badge m-2 '
    classes += `text-bg-${color}`

    return (
        <span className={classes} key={_id}>
            {name}
        </span>
    )
}

export default Badge
