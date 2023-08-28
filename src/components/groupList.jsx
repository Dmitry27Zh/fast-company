import React from 'react'
import PropTypes from 'prop-types'

const GroupList = (props) => {
    const { items, valueProperty, contentProperty, currentItem } = props
    const keys = Object.keys(items)

    return (
        <>
            <ul className="list-group">
                {keys.map((key) => {
                    const item = items[key]
                    const value = item[valueProperty]
                    const content = item[contentProperty]
                    let className = 'list-group-item'
                    className += currentItem === item ? ' active' : ''

                    return <li className={className} key={value} role='button'>{content}</li>
                })}
            </ul>
        </>
    )
}

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
}

GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    currentItem: PropTypes.object.isRequired
}

export default GroupList
