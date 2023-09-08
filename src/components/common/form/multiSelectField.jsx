import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = (props) => {
    const { name, onChange } = props
    let { options, value } = props
    const transformData = (data) => {
        if (data.length === 0) {
            return
        }

        const firstItem = data[0]

        if ('value' in firstItem && 'label' in firstItem) {
            return data
        }

        return data.map(({ name, _id }) => ({ value: _id, label: name }))
    }
    options = Array.isArray(options) ? options : Object.values(options)
    options = transformData(options)
    value = transformData(value)
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
