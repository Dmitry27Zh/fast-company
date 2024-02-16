import { createSlice } from '@reduxjs/toolkit'
import qualitiesService from '../services/qualities.service'

const initialState = {
    entities: null,
    isLoading: true,
    error: null
}

const slice = createSlice({
    name: 'qualities',
    initialState,
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesRecieved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        qualitiesRequestFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const { qualitiesRequested, qualitiesRecieved, qualitiesRequestFailed } =
    slice.actions

export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested())
    try {
        const { content } = await qualitiesService.get()
        dispatch(qualitiesRecieved(content))
    } catch (e) {
        qualitiesRequestFailed(e.message)
    }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading

export default slice.reducer
