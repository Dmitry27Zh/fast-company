/* eslint-disable */
import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { validator, getErrorMessageAtLeast } from '../utils/validator'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
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
            }
        }
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        console.log(errors)
        setErrors(errors)

        return Object.keys(errors).length === 0
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setData((previousState) => ({ ...previousState, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()

        if (isValid) {
            console.log(data)
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
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login
