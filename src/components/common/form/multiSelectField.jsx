import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = (props) => {
    const { name, value, onChange } = props
    let { options } = props
    options = Array.isArray(options) ? options : Object.values(options).map(({ name, _id }) => ({ value: _id, label: name }))
    const handleChange = (selectedOptions) => {
        const change = { [name]: selectedOptions }
        onChange(change)
    }

    return <Select isMulti closeMenuOnSelect={false} name={name} options={options} value={value} onChange={handleChange}/>
}

MultiSelectField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func
}

export default MultiSelectField
