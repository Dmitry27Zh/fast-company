import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../../badge'
import { useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities'
import LoaderMini from '../../common/loaders/LoaderMini'

const Qualities = ({ data = [] }) => {
    const isQualitiesLoading = useSelector(getQualitiesLoadingStatus())
    if (isQualitiesLoading) {
        return <LoaderMini />
    }
    const qualities = useSelector(getQualities())
    const qualitiesToRender = qualities.filter((quality) => data.includes(quality._id))

    return (
        <div>
            {qualitiesToRender?.map((item, index) => (
                <Badge key={index} {...item}></Badge>
            ))}
        </div>
    )
}

Qualities.propTypes = {
    data: PropTypes.array
}

export default Qualities
