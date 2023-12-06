import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { validator } from '../../../utils/validator'
import TextAreaField from '../../common/form/textAreaField'

const initialData = { content: '' }

export const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const handleChange = (change) => {
        setData((prevState) => ({
            ...prevState,
            ...change
        }))
    }
    const validatorConfig = {
        content: {
            isRequired: {
                message: 'Сообщение не может быть пустым'
            }
        }
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)

        return Object.keys(errors).length === 0
    }
    const clearForm = () => {
        setData(initialData)
        setErrors({})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()

        if (isValid) {
            onSubmit(data)
            clearForm()
        }
    }

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    )
}

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
}
