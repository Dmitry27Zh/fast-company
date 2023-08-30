import React from 'react'
import { cancelCamelCase, capitalize } from '../utils'
import PropTypes from 'prop-types'

const TableHeader = (props) => {
    const { heads, onSort } = props

    return <thead>
        <tr>
            {heads.map((head) => (
                <th onClick={() => onSort(head)} key={head} scope="col" role='button'>
                    {capitalize(cancelCamelCase(head))}
                </th>
            ))}
            <th></th>
        </tr>
    </thead>
}

TableHeader.propTypes = {
    heads: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired
}

export default TableHeader
