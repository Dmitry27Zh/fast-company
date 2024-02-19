import React from 'react'
import PropTypes from 'prop-types'
import MiniLoader from '../common/loaders/LoaderMini'
import { useSelector } from 'react-redux'
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions'

const Profession = ({ data }) => {
    const profession = useSelector(getProfessionById(data))
    const isLoading = useSelector(getProfessionsLoadingStatus())

    if (isLoading) {
        return <MiniLoader />
    } else {
        return profession.name
    }
}

Profession.propTypes = {
    data: PropTypes.string
}

export default Profession
