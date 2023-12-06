import React, { useContext, useEffect, useState } from 'react'
import PropType from 'prop-types'
import professionsService from '../services/professions.service'
import { toast } from 'react-toastify'

const ProfessionsContext = React.createContext()

export const useProfessions = () => {
    return useContext(ProfessionsContext)
}

const ProfessionsProvider = ({ children }) => {
    const [professions, setProfessions] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    async function getProfessions() {
        try {
            const { content } = await professionsService.get()
            setProfessions(content)
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getProfessions()
    }, [])
    useEffect(() => {
        if (error !== null) {
            toast(error.message)
            setError(null)
        }
    }, [error])

    return <ProfessionsContext.Provider value={{ professions }}>{isLoading ? 'loading...' : children}</ProfessionsContext.Provider>
}

ProfessionsProvider.propTypes = {
    children: PropType.oneOfType([PropType.node, PropType.arrayOf(PropType.node)])
}

export default ProfessionsProvider
