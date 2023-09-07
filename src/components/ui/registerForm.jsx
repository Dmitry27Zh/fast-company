import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import { validator, getErrorMessageAtLeast } from '../../utils/validator'
import { isObjEmpty } from '../../utils/object'
import { ValidationValue } from '../../constants'
import API from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male'
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState()
    const { email, password, profession, sex } = data
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
        },
        profession: {
            isRequired: {
                message: 'Choose your profession'
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

        return (
            <div className="mb-4">
                <SelectField
                    label="Profession"
                    name="profession"
                    value={profession}
                    onChange={handleChange}
                    options={professions}
                    error={getErrorMessageAtLeast(errors.profession)}
                />
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
            <div className='mb-4'>
                <RadioField label="Sex" name="sex" value={sex} onChange={handleChange} options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}/>
            </div>
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
