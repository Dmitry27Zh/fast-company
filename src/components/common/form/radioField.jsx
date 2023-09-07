import React from 'react'
import PropTypes from 'prop-types'

const RadioField = (props) => {
    const { label, name, value, onChange, options } = props
    const handleChange = (event) => {
        const { name, value } = event.target
        const change = { [name]: value }
        onChange(change)
    }
    const renderOptions = () => {
        return options.map(({ name: optionName, value: optionValue }) => {
            const id = `${optionName}_${optionValue}`
            const checked = optionValue === value

            return <div className="form-check form-check-inline" key={id}>
                <input className="form-check-input" type="radio" name={name} id={id} value={optionValue} checked={checked} onChange={handleChange}/>
                <label className="form-check-label" htmlFor={id}>{optionName}</label>
            </div>
        })
    }

    return <>
        <label className="form-label">{label}</label>
        <div className="input-group">
            {renderOptions()}
        </div>
    </>
}

RadioField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
}

export default RadioField
