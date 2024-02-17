import { createAction, createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'

const initialState = {
    entities: [],
    isLoading: true,
    error: null,
    auth: {
        isLoggedIn: false
    }
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
        },
        authRequestSuccess: (state, action) => {
            state.auth = { ...action.payload, isLoggedIn: true }
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { usersRequested, usersRecieved, usersRequestFailed, authRequestSuccess, authRequestFailed } = slice.actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await usersService.get()
        dispatch(usersRecieved(content))
    } catch (e) {
        dispatch(usersRequestFailed(e.message))
    }
}

const authRequested = createAction('users/authRequested')

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register({ email, password })
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({ userId: data.localId }))
    } catch (e) {
        dispatch(authRequestFailed(e.message))
    }
}

export const getUserById = (id) => (state) => state.users.entities.find((user) => user._id === id)
export const getUsersList = () => (state) => state.users.entities

export default slice.reducer
