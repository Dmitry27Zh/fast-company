import { useState } from 'react'
import httpService from '../services/http.service'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import { Status } from '../constants'

const useMockData = () => {
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(Status.IDLE)
    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put(`profession/${prof._id}`, prof)
            }
        } catch (e) {
            setError(e)
        }
    }

    return { error, initialize }
}

export default useMockData
