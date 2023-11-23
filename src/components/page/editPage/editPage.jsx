import React, { useEffect, useState } from 'react'
import EditForm from '../../ui/editForm'
import API from '../../../api'
import PropTypes from 'prop-types'
import BackButton from '../../common/backButton'

const EditPage = (props) => {
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

    return (
        <div className="container mt-5">
            <BackButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

EditPage.propTypes = {
    id: PropTypes.string
}

export default EditPage
