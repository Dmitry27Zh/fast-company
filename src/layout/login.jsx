/* eslint-disable */
import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'

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
            }
        },
        password: {
            isRequired: {
                message: 'Password is required'
            }
        }
    }
    const validate = () => {
        const errors = {}

        for (const fieldName in data) {
            const fieldData = data[fieldName]

            if (fieldData.trim().length === 0) {
                errors[fieldName] = `${fieldName} is required`
            }
        }

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
                error={errors.email}
            />
            <TextField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={handleChange}
                error={errors.password}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login
