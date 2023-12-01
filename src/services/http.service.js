import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            config.url = `${config.url.replace(/\/$/, '')}.json`
        }

        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

const transformData = (data) => {
    return data ? Object.values(data) : []
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
    delete: http.delete
}

export default httpService
