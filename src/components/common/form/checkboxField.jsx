import React from 'react'
import PropTypes from 'prop-types'

const CheckboxField = (props) => {
    const { name, value, onChange, children, error } = props
    const handleChange = () => {
        const change = { [name]: !value }
        onChange(change)
    }
    const getInputClasses = () => {
        let result = 'form-check-input'
        result += error ? ' is-invalid' : ''

        return result
    }
    const renderError = () => {
        if (error) {
            return <div className="invalid-feedback">{error}</div>
        }
    }

    return <div className="form-check">
        <input className={getInputClasses()} type="checkbox" value={value} id={name} onChange={handleChange}/>
        <label className="form-check-label" htmlFor={name}>
            {children}
        </label>
        {renderError()}
    </div>
}

CheckboxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string
}

export default CheckboxField
