import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import CheckboxField from '../common/form/checkboxField'
import { validator, getErrorMessageAtLeast } from '../../utils/validator'
import { isObjEmpty } from '../../utils/object'
import { ValidationValue } from '../../constants'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthErrors, signIn } from '../../store/users'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    })
    const enterError = useSelector(getAuthErrors())
    const [errors, setErrors] = useState({})
    const location = useLocation()
    const { email, password } = data
    useEffect(() => {
        validate()
    }, [data])
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Email is required'
            },
            isEmail: {
                message: 'Incorrect email'
            }
        },
        password: {
            isRequired: {
                message: 'Password is required'
            },
            containUpperCaseLetter: {
                message: 'Password should contain one uppercase letter at least'
            },
            containDigit: {
                message: 'Password should contain one digit at least'
            },
            minLength: {
                value: ValidationValue.minLength,
                message: `Password should contain minimum ${ValidationValue.minLength} symbols`
            },
            maxLength: {
                value: ValidationValue.maxLength,
                message: `Password should contain maximum ${ValidationValue.maxLength} symbols`
            }
        }
    }
    const isValid = (errors) => isObjEmpty(errors)
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)

        return isValid(errors)
    }
    const handleChange = (change) => {
        setData((previousState) => ({ ...previousState, ...change }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const isValid = validate()
        if (isValid) {
            const redirect = location.state?.from ?? '/'
            dispatch(signIn({ payload: data, redirect }))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={email}
                onChange={handleChange}
                error={getErrorMessageAtLeast(errors.email)}
            />
            <TextField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={handleChange}
                error={getErrorMessageAtLeast(errors.password)}
            />
            <div className="mb-2">
                <CheckboxField name="stayOn" value={data.stayOn} onChange={handleChange}>Stay on?</CheckboxField>
            </div>
            {enterError && <p className='text-danger'>{enterError}</p>}
            <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={!isValid(errors) || enterError}
            >
                Submit
            </button>
        </form>
    )
}

export default LoginForm
