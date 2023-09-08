import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../ui/qualities/qualities'

const UserPage = (props) => {
    const { id } = props
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
            <div className='d-flex flex-wrap gap-3'>
                <button className='btn btn-secondary' type="button" onClick={handleReturn}>
                Все пользователи
                </button>
                <Link className='btn btn-primary' to={'edit'}>
                Редактировать
                </Link>
            </div>
        </div>
    )
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
