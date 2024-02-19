import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            config.url = `${config.url.replace(/\/$/, '')}.json`
            const isExpired = localStorageService.getExpiresToken() < Date.now()
            const refreshToken = localStorageService.getRefreshToken()

            if (refreshToken && isExpired) {
                const data = await authService.refresh()
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    localId: data.user_id,
                    expiresIn: data.expires_in
                })
            }
            const accessToken = localStorageService.getAccessToken()

            if (accessToken) {
                config.params = { ...config.params, auth: accessToken }
            }
        }

        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

const transformData = (data) => {
    if (!data) {
        return []
    }
    if ('_id' in data) {
        return data
    } else {
        return Object.values(data)
    }
}

http.interceptors.response.use(
    function (res) {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) }
        }

        return res
    },
    function (error) {
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500

        if (!expectedErrors) {
            console.error(error)
            toast.error('Something was wrong. Try it later')
        }

        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
}

export default httpService
