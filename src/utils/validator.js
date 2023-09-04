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
        }

        if (invalid) {
            error[type] = message
        }

        return error
    }

    for (const fieldName in data) {
        const fieldData = data[fieldName]
        const currentConfig = config[fieldName]

        for (const type in currentConfig) {
            const { message } = currentConfig[type]
            const error = validate(fieldData, type, message)

            if (!(fieldName in errors)) {
                errors[fieldName] = {}
            }

            Object.assign(errors[fieldName], error)
        }
    }

    return errors
}

export const getErrorMessageAtLeast = (errors = {}) => {
    return Object.values(errors)[0]
}
