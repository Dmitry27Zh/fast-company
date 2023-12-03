const AuthKey = {
    TOKEN: 'jwt_token',
    REFRESH: 'jwt_refresh_token',
    EXPIRES: 'jwt_expires',
    USER_ID: 'user-local-id'
}

function setTokens({ refreshToken, idToken, localId, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(AuthKey.TOKEN, idToken)
    localStorage.setItem(AuthKey.REFRESH, refreshToken)
    localStorage.setItem(AuthKey.EXPIRES, expiresDate)
    localStorage.setItem(AuthKey.USER_ID, localId)
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

function getUserId() {
    return localStorage.getItem(AuthKey.USER_ID)
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresToken,
    getUserId
}

export default localStorageService
