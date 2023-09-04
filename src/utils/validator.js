import { isObjEmpty } from './object'

export const validator = (data, config) => {
    const errors = {}
    const validate = (value, type, message) => {
        const error = {}
        let invalid = false

        switch (type) {
        case 'isRequired':
            invalid = value.trim().length === 0

            break

        case 'isEmail': {
            const regExp = /^\S+@\S+\.\S+$/
            invalid = !regExp.test(value)

            break
        }
        case 'containUpperCaseLetter': {
            const regExp = /[A-Z]/
            invalid = !regExp.test(value)

            break
        }
        case 'containDigit': {
            const regExp = /\d/
            invalid = !regExp.test(value)

            break
        }
        }

        if (invalid) {
            error[type] = message
        }

        return error
    }

    for (const fieldName in data) {
        const fieldData = data[fieldName]
        const currentConfig = config[fieldName]
        let currentErrors = {}

        for (const type in currentConfig) {
            const { message } = currentConfig[type]
            const error = validate(fieldData, type, message)
            currentErrors = { ...currentErrors, ...error }
        }

        if (!isObjEmpty(currentErrors)) {
            errors[fieldName] = currentErrors
        }
    }

    return errors
}

export const getErrorMessageAtLeast = (errors = {}) => {
    return Object.values(errors)[0]
}
