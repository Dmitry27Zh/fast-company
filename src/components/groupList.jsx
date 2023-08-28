import React from 'react'
import PropTypes from 'prop-types'

const GroupList = (props) => {
    const { items, valueProperty, contentProperty } = props
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
                const item = items[key]
                const value = item[valueProperty]
                const content = item[contentProperty]

                return <div key={value}>{content}</div>
            })}</div>
        </>
    )
}

GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired
}

export default GroupList
