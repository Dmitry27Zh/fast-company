import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import Qualities from './qualities'

const User = () => {
    const { id } = useParams()
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

    return (
        <div>
            <h1>{name}</h1>
            <h2>{`Профессия: ${profession.name}`}</h2>
            <Qualities data={qualities} />
            <p>{`completedMeetings: ${completedMeetings}`}</p>
            <strong className="fs-1">{`Rate: ${rate}`}</strong>
        </div>
    )
}

export default User
