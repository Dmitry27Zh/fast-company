import React from 'react'
import PropTypes from 'prop-types'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'
import { useUsers } from '../../../hooks/useUsers'
import CommentsProvider from '../../../hooks/useComments'

const UserPage = (props) => {
    const { id } = props
    const { getUserById } = useUsers()
    const user = getUserById(id)

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingsCard value={user.completedMeetings}></MeetingsCard>
                </div>
                <div className="col-md-8">
                    <CommentsProvider><Comments /></CommentsProvider>
                </div>
            </div>
        </div>
    )
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
