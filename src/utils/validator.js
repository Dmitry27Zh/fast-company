export const validator = (data, config) => {
    const errors = {}
    const validate = (value, type, message) => {
        const error = {}

        switch (type) {
        case 'isRequired':
            if (value.trim().length === 0) {
                error[type] = message
            }
            break

        case 'isEmail': {
            const emailRegExp = /^\S+@\S+\.\S+$/

            if (!emailRegExp.test(value)) {
                error[type] = message
            }

            break
        }
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
