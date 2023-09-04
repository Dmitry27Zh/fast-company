import React from 'react'
import PropTypes from 'prop-types'

const Search = (props) => {
    const { onSearch } = props

    return <div><input className='w-100 p-2' type='search' placeholder='...search' onChange={onSearch}/></div>
}

Search.propTypes = {
    onSearch: PropTypes.func
}

export default Search
