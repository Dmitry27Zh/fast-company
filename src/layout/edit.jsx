import React, { useEffect, useState } from 'react'
import EditForm from '../components/ui/editForm'
import API from '../api'
import PropTypes from 'prop-types'

const Edit = (props) => {
    const { id } = props
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

Edit.propTypes = {
    id: PropTypes.string
}

export default Edit
