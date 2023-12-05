import httpService from './http.service'
import configFile from '../config.json'

const commentService = {
    getComments: async (pageId) => {
        const { data } = await httpService.get(`${configFile.commentEndpoint}`, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        })

        return data
    },
    createComment: async (comment) => {
        const { data } = await httpService.put(`${configFile.commentEndpoint}${comment._id}`, comment)

        return data
    }
}

export default commentService
