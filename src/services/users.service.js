import httpService from './http.service'
import config from '../config.json'

const usersService = {
    get: async () => {
        const { data } = await httpService.get(config.usersEndpoint)

        return data
    }
}

export default usersService
