import React from 'react'
import PropTypes from 'prop-types'
import MiniLoader from '../common/loaders/LoaderMini'
import { useSelector } from 'react-redux'
import { getProfessions } from '../../store/professions'

const Profession = ({ data }) => {
    const professions = useSelector(getProfessions())
    const isLoading = !professions

    if (isLoading) {
        return <MiniLoader />
    } else {
        const profession = professions.find((p) => p._id === data)
        return profession.name
    }
}

Profession.propTypes = {
    data: PropTypes.string
}

export default Profession
