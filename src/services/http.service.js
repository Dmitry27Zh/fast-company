import axios from 'axios'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndpoint

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService
