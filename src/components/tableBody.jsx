import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = (props) => {
    const { data, heads } = props
    const renderContent = (item, head) => {
        const { component, iter } = head

        if (!component) {
            return _.get(item, iter)
        }

        if (typeof component === 'function') {
            return component(item)
        }

        return component
    }

    return <tbody className="table-group-divider">
        {data.map((item) => {
            const { _id } = item

            return <tr key={_id}>
                {Object.keys(heads).map((key) => <td key={key}>{renderContent(item, heads[key])}</td>)}
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
