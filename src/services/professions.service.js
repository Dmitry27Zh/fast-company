import httpService from './http.service'
import config from '../config.json'

const professionsService = {
    get: async () => {
        const { data } = await httpService.get(config.professionsEndpoint)

        return data
    }
}

export default professionsService
