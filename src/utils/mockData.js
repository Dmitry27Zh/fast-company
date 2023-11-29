import { useEffect, useState } from 'react'
import httpService from '../services/http.service'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import { Status } from '../constants'

const useMockData = () => {
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(Status.IDLE)
    const [progress, setProgress] = useState(0)
    const [count, setCount] = useState(0)
    const totalCount = professions.length + qualities.length + users.length
    const incrementCount = () => {
        setCount((prevState) => prevState + 1)
    }
    const updateProgress = () => {
        const newProgress = Math.floor((count / totalCount) * 100)

        if (progress < newProgress) {
            setProgress(() => newProgress)
        }
    }
    useEffect(() => {
        if (count > 0 && status === Status.IDLE) {
            setStatus(Status.PENDING)
        }
        if (count === totalCount) {
            setStatus(Status.SUCCESS)
        }
        updateProgress()
    }, [count])
    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put(`profession/${prof._id}`, prof)
                incrementCount()
            }
            for (const user of users) {
                await httpService.put(`user/${user._id}`, user)
                incrementCount()
            }
            for (const quality of qualities) {
                await httpService.put(`quality/${quality._id}`, quality)
                incrementCount()
            }
        } catch (e) {
            setError(e)
        }
    }

    return { error, initialize, progress, status }
}

export default useMockData
