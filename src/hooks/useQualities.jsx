import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import qualitiesService from '../services/qualities.service'
import { toast } from 'react-toastify'

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    async function getQualities() {
        try {
            const { content } = await qualitiesService.get()
            setQualities(content)
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getQualities()
    }, [])
    useEffect(() => {
        if (error !== null) {
            toast(error.message)
            setError(null)
        }
    }, [error])

    return (
        <QualitiesContext.Provider value={{ qualities }}>
            {isLoading ? 'loading...' : children}
        </QualitiesContext.Provider>
    )
}

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default QualitiesProvider
