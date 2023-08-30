import React from 'react'
import { capitalize } from '../utils'
import PropTypes from 'prop-types'

const TableHeader = (props) => {
    const { onSort } = props
    const testHeads = {
        name: {
            iter: 'name',
            value: 'Имя'
        },
        profession: {
            iter: 'profession.name',
            value: 'Профессия'
        },
        qualities: {
            value: 'Качества'
        },
        completedMeetings: {
            iter: 'completedMeetings',
            value: 'Количество встреч'
        },
        rate: {
            iter: 'rate',
            value: 'Рейтинг'
        },
        bookmark: {
            value: 'Избранное'
        }
    }
    const keys = Object.keys(testHeads)
    const handleSort = (iter) => {
        if (iter) {
            onSort(iter)
        }
    }

    return <thead>
        <tr>
            {keys.map((key) => {
                const { iter, value } = testHeads[key]
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
    heads: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired
}

export default TableHeader
