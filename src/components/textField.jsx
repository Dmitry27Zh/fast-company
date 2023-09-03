import React from 'react'
import PropTypes from 'prop-types'

const TextField = (props) => {
    const { label, type, name, value, onChange } = props

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                value={value}
                name={name}
                onChange={onChange}
            />
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
    onChange: PropTypes.func
}

export default TextField
