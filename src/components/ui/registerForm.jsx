import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import CheckboxField from '../common/form/checkboxField'
import { isObjEmpty } from '../../utils/object'
import { ValidationValue } from '../../constants'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import * as yup from 'yup'
import { useProfessions } from '../../hooks/useProfessions'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities'

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        name: '',
        qualities: [],
        license: false
    })
    const [errors, setErrors] = useState({})
    const { professions } = useProfessions()
    const qualities = useSelector(getQualities())
    const isQualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const { email, password, profession, sex, name } = data
    useEffect(() => {
        validate()
    }, [data])
    const validateScheme = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Incorrect email'),
        name: yup
            .string()
            .required('Name is required')
            .matches(/.{3,}/, 'Name should contain minimum 3 symbols'),
        password: yup
            .string()
            .required('Password is required')
            .matches(
                /[A-Z]/,
                'Password should contain one uppercase letter at least'
            )
            .matches(/\d/, 'Password should contain one digit at least')
            .matches(
                /[!@#$%^&*]/,
                'Password should contain one special symbol !@#$%^&* at least'
            )
            .matches(
                new RegExp(`.{${ValidationValue.minLength},}`),
                `Password should contain minimum ${ValidationValue.minLength} symbols`
            )
            .matches(
                new RegExp(`^.{0,${ValidationValue.maxLength}}$`),
                `Password should contain maximum ${ValidationValue.maxLength} symbols`
            ),
        profession: yup.string().required('Choose your profession'),
        license: yup.boolean().oneOf([true], 'You should agree')
    })
    const isValid = (errors) => isObjEmpty(errors)
    const validate = async () => {
        let errors

        await validateScheme
            .validate(data, { abortEarly: false })
            .then(() => setErrors({}))
            .catch((result) => {
                const { path, message } = result.inner[0]
                errors = { [path]: message }
                setErrors(errors)
            })

        return isValid(errors)
    }
    const handleChange = (change) => {
        setData((previousState) => ({ ...previousState, ...change }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const isValid = await validate()

        if (isValid) {
            const newData = {
                ...data,
                qualities: data.qualities.map((quality) => quality.value)
            }

            try {
                await signUp(newData)
                navigate('/')
            } catch (e) {
                setErrors((prevState) => ({ ...prevState, ...e }))
            }
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
        if (!isQualitiesLoading) {
            return (
                <MultiSelectField
                    name="qualities"
                    options={qualities}
                    value={data.qualities}
                    onChange={handleChange}
                />
            )
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
                label="Name"
                name="name"
                value={name}
                onChange={handleChange}
                error={errors.name}
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
            <div className="mb-4">
                <RadioField
                    label="Sex"
                    name="sex"
                    value={sex}
                    onChange={handleChange}
                    options={[
                        { name: 'Male', value: 'male' },
                        { name: 'Female', value: 'female' },
                        { name: 'Other', value: 'other' }
                    ]}
                />
            </div>
            <div className="mb-4">{renderQualitiesSelect()}</div>
            <div className="mb-2">
                <CheckboxField
                    name="license"
                    value={data.license}
                    onChange={handleChange}
                    error={errors.license}
                >
                    License agreement?
                </CheckboxField>
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
