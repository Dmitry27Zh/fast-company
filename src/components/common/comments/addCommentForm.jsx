import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { validator } from '../../../utils/validator'
import api from '../../../api'
import SelectField from '../../common/form/selectField'
import TextAreaField from '../../common/form/textAreaField'

const initialData = { userId: '', content: '' }

export const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData)
    const [users, setUsers] = useState({})
    const [errors, setErrors] = useState({})
    useEffect(() => {
        api.users.fetchAll().then(setUsers)
    }, [])
    const handleChange = (change) => {
        setData((prevState) => ({
            ...prevState,
            ...change
        }))
    }
    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Выберите от чьего имени вы хотите отправить сообщение'
            }
        },
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
    const usersSelectOptions = Object.keys(users)?.map((userId) => {
        const user = users[userId]

        return {
            name: user.name,
            value: user._id,
            _id: user._id
        }
    })

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <SelectField
                        onChange={handleChange}
                        options={usersSelectOptions}
                        name="userId"
                        value={data.userId}
                        defaultOption={{
                            name: 'Выберите пользователя',
                            value: ''
                        }}
                        errors={errors.userId}
                    />
                </div>
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
