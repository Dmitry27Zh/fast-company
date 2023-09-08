import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import { isObjEmpty } from '../../utils/object'
import API from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import * as yup from 'yup'
import PropTypes from 'prop-types'

const EditForm = (props) => {
    const { name, email, profession, sex, qualities } = props
    const [data, setData] = useState({
        name,
        email,
        profession: profession.name,
        sex,
        qualities
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState()
    const [allQualities, setAllQualities] = useState()
    useEffect(() => {
        validate()
    }, [data])
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data))
        API.qualities.fetchAll().then((data) => setAllQualities(data))
    }, [])
    const validateScheme = yup.object().shape({
        name: yup.string().required('Name is reuqired'),
        email: yup.string().required('Email is required').email('Incorrect email'),
        profession: yup.string().required('Choose your profession')
    })
    const isValid = (errors) => isObjEmpty(errors)
    const validate = async () => {
        let errors

        await validateScheme.validate(data, { abortEarly: false }).then(() => setErrors({})).catch((result) => {
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
                    value={data.profession}
                    onChange={handleChange}
                    options={professions}
                    error={errors.profession}
                />
            </div>
        )
    }
    const renderQualitiesSelect = () => {
        if (allQualities) {
            return <MultiSelectField name="qualities" options={allQualities} value={data.qualities} onChange={handleChange} />
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
            <div className='mb-4'>
                <RadioField label="Sex" name="sex" value={data.sex} onChange={handleChange} options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}/>
            </div>
            <div className='mb-4'>
                {renderQualitiesSelect()}
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

EditForm.defaultProps = {
    email: '',
    sex: 'male'
}

EditForm.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    profession: PropTypes.object,
    sex: PropTypes.string,
    qualities: PropTypes.array
}

export default EditForm
