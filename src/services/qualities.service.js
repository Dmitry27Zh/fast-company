import httpService from '../services/http.service'
import config from '../config.json'

const qualitiesService = {
    get: async () => {
        const { content } = await httpService(config.qualitiesEndpoint)

        return content
    }
}

export default qualitiesService
