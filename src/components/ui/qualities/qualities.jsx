import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../../badge'

const Qualities = ({ data }) => {
    return (
        <div>
            {data.map((item, index) => (
                <Badge key={index} {...item}></Badge>
            ))}
        </div>
    )
}

Qualities.propTypes = {
    data: PropTypes.array
}

export default Qualities
