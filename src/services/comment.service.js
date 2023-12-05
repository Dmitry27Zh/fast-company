import httpService from './http.service'
import configFile from '../config.json'

const commentService = {
    createComment: async (comment) => {
        const { data } = await httpService.put(`${configFile.commentEndpoint}${comment._id}`, comment)

        return data
    }
}

export default commentService
