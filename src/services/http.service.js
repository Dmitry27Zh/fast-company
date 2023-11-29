import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

axios.defaults.baseURL = configFile.apiEndpoint

axios.interceptors.request.use(
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

axios.interceptors.response.use(
    (res) => res,
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
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService
