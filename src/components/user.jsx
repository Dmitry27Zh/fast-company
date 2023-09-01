import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'
import Qualities from './qualities'

const User = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getUserById(id).then((data) => {
            setUser(data)
        })
    }, [])

    if (!user) {
        return 'Loading...'
    }

    const { name, profession, qualities, completedMeetings, rate } = user
    const handleReturn = () => {
        navigate('/users')
    }

    return (
        <div className="d-inline-flex flex-column">
            <h1>{name}</h1>
            <h2>{`Профессия: ${profession.name}`}</h2>
            <Qualities data={qualities} />
            <p>{`completedMeetings: ${completedMeetings}`}</p>
            <strong className="fs-1">{`Rate: ${rate}`}</strong>
            <button type="button" onClick={handleReturn}>
                Все пользователи
            </button>
        </div>
    )
}

export default User
