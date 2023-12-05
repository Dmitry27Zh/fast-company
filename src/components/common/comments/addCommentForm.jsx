import React, { useState } from 'react'
import { validator } from '../../../utils/validator'
import TextAreaField from '../../common/form/textAreaField'
import { useComments } from '../../../hooks/useComments'

const initialData = { content: '' }

export const AddCommentForm = () => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const { createComment } = useComments()
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
            createComment(data)
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
