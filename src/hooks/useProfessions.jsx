import React, { useContext, useEffect, useState } from 'react'
import PropType from 'prop-types'
import professionsService from '../services/professions.service'

const ProfessionsContext = React.createContext()

export const useProfessions = () => {
    return useContext(ProfessionsContext)
}

const ProfessionsProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [professions, setProfessions] = useState([])
    async function getProfessions() {
        try {
            const { content } = await professionsService.get()
            setProfessions(content)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getProfessions()
    }, [])

    return <ProfessionsContext.Provider value={professions}>{isLoading ? 'loading...' : children}</ProfessionsContext.Provider>
}

ProfessionsProvider.propTypes = {
    children: PropType.oneOfType([PropType.node, PropType.arrayOf(PropType.node)])
}

export default ProfessionsProvider
