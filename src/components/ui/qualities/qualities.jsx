import React from 'react'
import Badge from '../../badge'
import PropTypes from 'prop-types'

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
