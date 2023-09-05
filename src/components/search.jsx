import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Search = (props) => {
    const { search, onSearch } = props
    const [value, setValue] = useState('')
    useEffect(() => {
        if (search === '') {
            setValue('')
        }
    }, [search])
    const updateSearch = useCallback(
        _.debounce((value) => {
            onSearch(value.trim())
        }, 1000),
        []
    )
    const handleChange = (event) => {
        const { value } = event.target
        setValue(value)
        updateSearch(value)
    }

    return <div><input className='w-100 p-2' type='search' placeholder='...search' value={value} onChange={handleChange}/></div>
}

Search.propTypes = {
    search: PropTypes.string,
    onSearch: PropTypes.func
}

export default Search
