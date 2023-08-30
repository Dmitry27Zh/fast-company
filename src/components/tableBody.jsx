import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = (props) => {
    const { data, heads, onDelete } = props

    return <tbody className="table-group-divider">
        {data.map((item) => {
            const { _id } = item

            return <tr key={_id}>
                {Object.keys(heads).map((key) => {
                    const head = heads[key]
                    const content = _.get(item, head.iter)
                    console.log()
                    return <td key={key}>{content}</td>
                })}
                <td>
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => onDelete(_id)}
                    >
                    Delete
                    </button>
                </td>
            </tr>
        })}
    </tbody>
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    heads: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func
}

export default TableBody
