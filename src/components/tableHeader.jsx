import React from 'react'
import { capitalize } from '../utils'
import PropTypes from 'prop-types'

const TableHeader = (props) => {
    const { heads, currentSort, onSort } = props
    const keys = Object.keys(heads)
    const handleSort = (iter) => {
        if (iter) {
            const order = iter === currentSort.iter && currentSort.order === 'asc' ? 'desc' : 'asc'
            onSort({ iter, order })
        }
    }

    return <thead>
        <tr>
            {keys.map((key) => {
                const { iter, value } = heads[key]
                const role = iter ? 'button' : null
                const isActive = currentSort.iter === iter
                const renderIcon = () => {
                    const visibility = isActive ? 'visible' : 'hidden'
                    const isAscending = currentSort.order === 'asc'

                    if (isAscending) {
                        return <i className="bi bi-caret-up-fill flex-shrink-0 p-2" style={{ visibility }}></i>
                    } else {
                        return <i className="bi bi-caret-down-fill flex-shrink-0 p-2" style={{ visibility }}></i>
                    }
                }

                return <th onClick={() => handleSort(iter)} key={key} scope="col" role={role}>
                    <div className="d-flex align-items-center">
                        <span>{capitalize(value)}</span>
                        {renderIcon()}
                    </div>
                </th>
            })}
            <th></th>
        </tr>
    </thead>
}

TableHeader.propTypes = {
    heads: PropTypes.object.isRequired,
    currentSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
}

export default TableHeader
