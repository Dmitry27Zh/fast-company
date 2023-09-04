import React from 'react'
import PropTypes from 'prop-types'

const TextField = (props) => {
    const { label, type, name, value, onChange, error } = props
    const getInputClasses = () => {
        let result = 'form-control'
        result += error ? ' is-invalid' : ''

        return result
    }
    const renderError = () => {
        if (error) {
            return <p>{error}</p>
        }
    }

    return (
        <div className='mb-4'>
            <label htmlFor={name}>{label}</label>
            <input
                className={getInputClasses()}
                type={type}
                id={name}
                value={value}
                name={name}
                onChange={onChange}
            />
            {renderError()}
        </div>
    )
}

TextField.defaultProps = {
    type: 'text'
}

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default TextField
