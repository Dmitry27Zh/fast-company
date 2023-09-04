import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Search = (props) => {
    const { onSearch } = props
    const handleChange = _.debounce((event) => {
        onSearch(event)
    }, 500)

    return <div><input className='w-100 p-2' type='search' placeholder='...search' onChange={handleChange}/></div>
}

Search.propTypes = {
    onSearch: PropTypes.func
}

export default Search
