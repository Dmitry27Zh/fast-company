import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import TextField from '../common/form/textField'
import { isObjEmpty } from '../../utils/object'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useProfessions } from '../../hooks/useProfessions'
import { useAuth } from '../../hooks/useAuth'
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities'

const EditForm = ({ user }) => {
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession._id,
        sex: user.sex,
        qualities: user.qualities ?? []
    })
    const [errors, setErrors] = useState({})
    const { professions } = useProfessions()
    const qualities = useSelector(getQualities())
    const isQualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const { updateUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        validate()
    }, [data])
    const validateScheme = yup.object().shape({
        name: yup.string().required('Name is reuqired'),
        email: yup
            .string()
            .required('Email is required')
            .email('Incorrect email'),
        profession: yup.string().required('Choose your profession')
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
            const newUser = {
                ...user,
                ...data,
                qualities: data.qualities.map(({ value }) => value)
            }
            await updateUser(newUser)
            navigate(`/users/${user._id}`)
        }
    }
    const renderProfessionsSelect = () => {
        if (professions) {
            return (
                <div className="mb-4">
                    <SelectField
                        label="Profession"
                        name="profession"
                        value={data.profession}
                        onChange={handleChange}
                        options={professions}
                        error={errors.profession}
                    />
                </div>
            )
        }
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
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            {renderProfessionsSelect()}
            <div className="mb-4">
                <RadioField
                    label="Sex"
                    name="sex"
                    value={data.sex}
                    onChange={handleChange}
                    options={[
                        { name: 'Male', value: 'male' },
                        { name: 'Female', value: 'female' },
                        { name: 'Other', value: 'other' }
                    ]}
                />
            </div>
            <div className="mb-4">{renderQualitiesSelect()}</div>
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

EditForm.defaultProps = {
    email: '',
    sex: 'male'
}

EditForm.propTypes = {
    user: PropTypes.object
}

export default EditForm
