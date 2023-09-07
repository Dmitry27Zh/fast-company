import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = (props) => {
    const { name } = props
    let { options } = props
    options = Array.isArray(options) ? options : Object.values(options).map(({ name, _id }) => ({ value: _id, label: name }))
    const handleChange = (event) => {
        console.log(event)
    }

    return <Select isMulti name={name} options={options} onChange={handleChange}/>
}

MultiSelectField.propTypes = {
    name: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func
}

export default MultiSelectField
