import React from 'react'
import PropTypes from 'prop-types'
import { useProfessions } from '../../hooks/useProfessions'
import MiniLoader from '../common/loaders/LoaderMini'

const Profession = ({ data }) => {
    const { professions } = useProfessions()
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
