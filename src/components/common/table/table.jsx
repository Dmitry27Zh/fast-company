import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = (props) => {
    const { heads, currentSort, users, onSort, children, ...rest } = props
    const renderContent = () => {
        if (children) {
            return children
        } else {
            return <>
                <TableHeader heads={heads} currentSort={currentSort} onSort={onSort} />
                <TableBody data={users} heads={heads} {...rest} />
            </>
        }
    }

    return <table className="table">
        {renderContent()}
    </table>
}

Table.propTypes = {
    heads: PropTypes.object,
    currentSort: PropTypes.object,
    users: PropTypes.array,
    onSort: PropTypes.func,
    children: PropTypes.array
}

export default Table
