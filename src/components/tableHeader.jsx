import React from 'react'
import { capitalize } from '../utils'
import PropTypes from 'prop-types'

const TableHeader = (props) => {
    const { heads, onSort } = props
    const keys = Object.keys(heads)
    const handleSort = (iter) => {
        if (iter) {
            onSort(iter)
        }
    }

    return <thead>
        <tr>
            {keys.map((key) => {
                const { iter, value } = heads[key]
                const role = iter ? 'button' : null

                return <th onClick={() => handleSort(iter)} key={key} scope="col" role={role}>
                    {capitalize(value)}
                </th>
            })}
            <th></th>
        </tr>
    </thead>
}

TableHeader.propTypes = {
    heads: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
}

export default TableHeader
