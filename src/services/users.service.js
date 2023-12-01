import httpService from './http.service'
import config from '../config.json'

const usersService = {
    get: async () => {
        const { data } = await httpService.get(config.usersEndpoint)

        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(`${config.usersEndpoint}${payload._id}`, payload)

        return data
    }
}

export default usersService
