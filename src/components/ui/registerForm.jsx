import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import CheckboxField from '../common/form/checkboxField'
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
        profession: yup.string().required('Choose your profession'),
        license: yup.string().required('You should agree'),
        password: yup.string().required('Password is required')
            .matches(/[A-Z]/, 'Password should contain one uppercase letter at least')
            .matches(/\d/, 'Password should contain one digit at least')
            .matches(/[!@#$%^&*]/, 'Password should contain one special symbol !@#$%^&* at least')
            .matches(new RegExp(`.{${ValidationValue.minLength},}`), `Password should contain minimum ${ValidationValue.minLength} symbols`)
            .matches(new RegExp(`^.{0,${ValidationValue.maxLength}}$`), `Password should contain maximum ${ValidationValue.maxLength} symbols`),
        email: yup.string().required('Email is required').email('Incorrect email')
    })
    const isValid = (errors) => isObjEmpty(errors)
    const validate = () => {
        validateScheme.validate(data).then(() => setErrors({})).catch(({ path, message }) => setErrors({ [path]: message }))

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
                    error={errors.profession}
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
            {renderProfessionsSelect()}
            <div className='mb-4'>
                <RadioField label="Sex" name="sex" value={sex} onChange={handleChange} options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}/>
            </div>
            <div className='mb-4'>
                {renderQualitiesSelect()}
            </div>
            <div className="mb-2">
                <CheckboxField name="license" value={data.license} onChange={handleChange} error={errors.license}>License agreement?</CheckboxField>
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
