import { createSlice } from '@reduxjs/toolkit'
import { isLoadingNeed } from './utils'
import professionsService from '../services/professions.service'

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
}

const slice = createSlice({
    name: 'professions',
    initialState,
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
            state.lastFetch = Date.now()
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { professionsRequested, professionsReceived, professionsRequestFailed } = slice.actions

export const loadProfessionsList = () => async (dispatch, getState) => {
    if (isLoadingNeed(getState().professions.lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await professionsService.get()
            dispatch(professionsReceived(content))
        } catch (e) {
            dispatch(professionsRequestFailed(e.message))
        }
    }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading

export default slice.reducer
