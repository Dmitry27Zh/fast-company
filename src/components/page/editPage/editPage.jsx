import React from 'react'
import EditForm from '../../ui/editForm'
import PropTypes from 'prop-types'
import BackButton from '../../common/backButton'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

const EditPage = (props) => {
    const { id } = props
    const user = useSelector(getUserById(id))
    const renderContent = () => {
        if (user) {
            return <EditForm user={user} />
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
