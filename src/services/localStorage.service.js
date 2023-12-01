const AuthKey = {
    TOKEN: 'jwt_token',
    REFRESH: 'jwt_refresh_token',
    EXPIRES: 'jwt_expires'
}

function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(AuthKey.TOKEN, idToken)
    localStorage.setItem(AuthKey.REFRESH, refreshToken)
    localStorage.setItem(AuthKey.EXPIRES, expiresDate)
}

function getAccessToken() {
    return localStorage.getItem(AuthKey.TOKEN)
}

function getRefreshToken() {
    return localStorage.getItem(AuthKey.REFRESH)
}

function getExpiresToken() {
    return localStorage.getItem(AuthKey.EXPIRES)
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresToken
}

export default localStorageService
