import React from 'react'
import PropTypes from 'prop-types'

const SelectField = (props) => {
    const { label, name, value, onChange, error, defaultOption } = props
    let { options } = props
    const { name: defaultOptionName, value: defaultOptionValue } = defaultOption
    options = Array.isArray(options) ? options : Object.values(options)
    const getInputClasses = () => {
        let result = 'form-select'
        result += error ? ' is-invalid' : ''

        return result
    }

    const renderOptions = () => {
        return (
            <>
                <option disabled value={defaultOptionValue}>
                    {defaultOptionName}
                </option>
                {options.map(({ _id, name }) => (
                    <option value={_id} key={_id}>
                        {name}
                    </option>
                ))}
            </>
        )
    }
    const renderError = () => {
        if (error) {
            return <div className="invalid-feedback">{error}</div>
        }
    }

    return (
        <>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <select
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    {renderOptions()}
                </select>
                {renderError()}
            </div>
        </>
    )
}

SelectField.defaultProps = {
    defaultOption: {
        value: '',
        name: 'Choose...'
    }
}

SelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string,
    defaultOption: PropTypes.object
}

export default SelectField
