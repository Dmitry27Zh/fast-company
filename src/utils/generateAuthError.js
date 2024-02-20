export const generateAuthError = (message) => {
    switch (message) {
    case 'INVALID_LOGIN_CREDENTIALS':
        return 'Incorrect login or password'
    case 'EMAIL_EXISTS':
        return 'User with this email already exists'
    default:
        return 'Too many attempts. Try later'
    }
}
