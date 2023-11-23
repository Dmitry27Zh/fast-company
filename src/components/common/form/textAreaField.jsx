import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = (props) => {
    const { label, name, value, onChange, error } = props
    const getInputClasses = () => {
        let result = 'form-control'
        result += error ? ' is-invalid' : ''

        return result
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        const change = { [name]: value }
        onChange(change)
    }
    const renderError = () => {
        if (error) {
            return <div className="invalid-feedback">{error}</div>
        }
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    className={getInputClasses()}
                    id={name}
                    value={value}
                    name={name}
                    onChange={handleChange}
                />
                {renderError()}
            </div>
        </div>
    )
}

TextAreaField.defaultProps = {
    type: 'text'
}

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default TextAreaField
