import React, { useEffect, useState } from 'react'
import EditForm from '../components/ui/editForm'
import { useParams } from 'react-router-dom'
import API from '../api'

const Edit = () => {
    const { id } = useParams()
    const [user, setUser] = useState()
    useEffect(() => {
        API.users.getUserById(id).then((data) => setUser(data))
    }, [])

    const renderContent = () => {
        if (user) {
            return <EditForm {...user} />
        } else {
            return 'Loading...'
        }
    }

    return <div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
                {renderContent()}
            </div>
        </div>
    </div>
}

export default Edit
