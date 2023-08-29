import React from 'react'
import PropTypes from 'prop-types'

const GroupList = (props) => {
    const { items, valueProperty, contentProperty, selectedItem, onSelect } = props
    const itemsToRender = Array.isArray(items) ? items : Object.values(items)

    return (
        <>
            <ul className="list-group">
                {itemsToRender.map((item) => {
                    const value = item[valueProperty]
                    const content = item[contentProperty]
                    let className = 'list-group-item'
                    className += selectedItem === item ? ' active' : ''

                    return <li className={className} key={value} onClick={() => onSelect(item)} role='button'>{content}</li>
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
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object,
    onSelect: PropTypes.func
}

export default GroupList
