import { createAction, createSlice } from '@reduxjs/toolkit'
import commentsService from '../services/comment.service'
import { getCurrentUserId } from './users'
import { nanoid } from 'nanoid'

const initialState = {
    entities: null,
    isLoading: true,
    error: null
}

const slice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
        }
    }
})

const { commentsRequested, commentsReceived, commentsRequestFailed, commentCreated } = slice.actions

const addCommentRequested = createAction('comments/addCommentRequested')

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentsService.getComments(pageId)
        dispatch(commentsReceived(content))
    } catch (e) {
        dispatch(commentsRequestFailed(e.message))
    }
}

export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(addCommentRequested(payload))
    const comment = {
        ...payload.data,
        _id: nanoid(),
        pageId: payload.pageId,
        userId: getCurrentUserId()(getState()),
        created_at: Date.now()
    }
    try {
        const { content } = await commentsService.createComment(comment)
        dispatch(commentCreated(content))
    } catch (e) {
        dispatch(commentsRequestFailed(e.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getProfessionById = (id) => (state) => state.comments.entities.find((p) => p._id === id)
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default slice.reducer
