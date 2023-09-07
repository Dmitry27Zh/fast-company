import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import CheckboxField from '../common/form/checkboxField'
import { validator, getErrorMessageAtLeast } from '../../utils/validator'
import { isObjEmpty } from '../../utils/object'
import { ValidationValue } from '../../constants'
import API from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import * as yup from 'yup'

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        license: false
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState()
    const [qualities, setQualities] = useState()
    const { email, password, profession, sex } = data
    useEffect(() => {
        validate()
    }, [data])
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data))
        API.qualities.fetchAll().then((data) => setQualities(data))
    }, [])
    const validateScheme = yup.object().shape({
        email: yup.string().required('Email is required').email('Incorrect email'),
        password: yup.string().required('Password is required')
            .matches(/[A-Z]/, 'Password should contain one uppercase letter at least')
            .matches(/\d/, 'Password should contain one digit at least')
            .matches(/[!@#$%^&*]/, 'Password should contain one special symbol !@#$%^&* at least')
            .matches(new RegExp(`.{${ValidationValue.minLength},}`), `Password should contain minimum ${ValidationValue.minLength} symbols`)
            .matches(new RegExp(`.{,${ValidationValue.maxLength}}`), `Password should contain maximum ${ValidationValue.maxLength} symbols`)
    })
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
        },
        license: {
            isRequired: {
                message: 'You should agree'
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
    const renderQualitiesSelect = () => {
        if (qualities) {
            return <MultiSelectField name="qualities" options={qualities} value={data.qualities} onChange={handleChange} />
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
            {renderProfessionsSelect()}
            <div className='mb-4'>
                <RadioField label="Sex" name="sex" value={sex} onChange={handleChange} options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}/>
            </div>
            <div className='mb-4'>
                {renderQualitiesSelect()}
            </div>
            <div className="mb-2">
                <CheckboxField name="license" value={data.license} onChange={handleChange} error={getErrorMessageAtLeast(errors.license)}>License agreement?</CheckboxField>
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
