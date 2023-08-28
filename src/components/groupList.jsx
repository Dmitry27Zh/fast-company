import React from 'react'
import PropTypes from 'prop-types'

const GroupList = (props) => {
    const { items } = props
    const keys = Object.keys(items)

    return (
        <>
            <ul className="list-group">
                <li className="list-group-item active">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div>{keys.map((key) => {
                const { _id, name } = items[key]

                return <div key={_id}>{name}</div>
            })}</div>
        </>
    )
}

GroupList.propTypes = {
    items: PropTypes.object.isRequired
}

export default GroupList
