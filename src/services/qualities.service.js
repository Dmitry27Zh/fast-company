import httpService from '../services/http.service'
import config from '../config.json'

const qualitiesService = {
    get: async () => {
        const { data } = await httpService.get(config.qualitiesEndpoint)

        return data
    }
}

export default qualitiesService
