import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import { validator, getErrorMessageAtLeast } from '../../utils/validator'
import { isObjEmpty } from '../../utils/object'
import { ValidationValue } from '../../constants'
import API from '../../api'

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState()
    const { email, password } = data
    useEffect(() => {
        validate()
    }, [data])
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
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
    const renderProfessionsSelect = () => {
        if (!professions) {
            return
        }

        const keys = Object.keys(professions)
        const renderOptions = () => {
            return (
                <>
                    <option disabled value="">
                        Choose...
                    </option>
                    {keys.map((key) => {
                        const { _id, name } = professions[key]

                        return (
                            <option value={_id} key={_id}>
                                {name}
                            </option>
                        )
                    })}
                </>
            )
        }

        return (
            <div className="mb-4">
                <label htmlFor="profession" className="form-label">
                    Profession
                </label>
                <select
                    className="form-select"
                    id="profession"
                    name="profession"
                    required
                    defaultValue=""
                >
                    {renderOptions()}
                </select>
                <div className="invalid-feedback">
                    Please select a valid state.
                </div>
            </div>
        )
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
            {renderProfessionsSelect()}
            <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={!isValid(errors)}
            >
                Submit
            </button>
        </form>
    )
}

export default RegisterForm
