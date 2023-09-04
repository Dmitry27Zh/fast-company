import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = (props) => {
    const { label, type, name, value, onChange, error } = props
    const [passwordShow, setPasswordShow] = useState(false)
    const getInputClasses = () => {
        let result = 'form-control'
        result += error ? ' is-invalid' : ''

        return result
    }
    const togglePasswordShow = () => {
        setPasswordShow((previousState) => !previousState)
    }
    const renderError = () => {
        if (error) {
            return <div className='invalid-feedback'>{error}</div>
        }
    }
    const renderPasswordVisibilityBtn = () => {
        if (type === 'password') {
            const getIconClasses = () => {
                let result = 'bi'
                result += passwordShow ? ' bi-eye-slash' : ' bi-eye'

                return result
            }

            return <button className='btn btn-outline-secondary' type='button' onClick={togglePasswordShow}><i className={getIconClasses()}></i></button>
        }
    }

    const renderType = type === 'password' && passwordShow ? 'text' : type

    return (
        <div className='mb-4'>
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    type={renderType}
                    id={name}
                    value={value}
                    name={name}
                    onChange={onChange}
                />
                {renderPasswordVisibilityBtn()}
                {renderError()}
            </div>
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
