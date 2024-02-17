import React from 'react'
import PropTypes from 'prop-types'
import LoaderMini from './loaders/LoaderMini'

const GroupList = (props) => {
    const { isLoading, items, valueProperty, contentProperty, selectedItem, onSelect } = props

    if (isLoading) {
        return <LoaderMini />
    } else {
        const itemsToRender = Array.isArray(items) ? items : Object.values(items)

        return (
            <ul className="list-group">
                {itemsToRender.map((item) => {
                    const value = item[valueProperty]
                    const content = item[contentProperty]
                    let className = 'list-group-item'
                    className += selectedItem === item ? ' active' : ''

                    return <li className={className} key={value} onClick={() => onSelect(item)} role='button'>{content}</li>
                })}
            </ul>
        )
    }
}

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
}

GroupList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object,
    onSelect: PropTypes.func
}

export default GroupList
