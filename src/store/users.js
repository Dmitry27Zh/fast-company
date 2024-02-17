import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users.service'

const initialState = {
    entities: [],
    isLoading: true,
    error: null
}

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersRecieved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const { usersRequested, usersRecieved, usersRequestFailed } = slice.actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await usersService.get()
        dispatch(usersRecieved(content))
    } catch (e) {
        dispatch(usersRequestFailed(e.message))
    }
}

export default slice.reducer
