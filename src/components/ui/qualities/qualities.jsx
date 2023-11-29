import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../../badge'
import { useQualities } from '../../../hooks/useQualities'

const Qualities = ({ qualitiesId }) => {
    const qualities = useQualities()
    const data = qualities.filter((quality) => qualitiesId.includes(quality._id))

    return (
        <div>
            {data.map((item, index) => (
                <Badge key={index} {...item}></Badge>
            ))}
        </div>
    )
}

Qualities.propTypes = {
    qualitiesId: PropTypes.array
}

export default Qualities
