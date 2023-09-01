import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

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

    const { name, profession } = user

    return (
        <div>
            <h1>{name}</h1>
            <h2>{`Профессия: ${profession.name}`}</h2>
        </div>
    )
}

export default User
