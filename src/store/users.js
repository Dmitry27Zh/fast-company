import { createAction, createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { getRandomInteger } from '../utils'
import { customHistory } from '../router/CustomBrowserRouter'

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
        },
        userCreated: (state, action) => {
            if (state.entities == null) {
                state.entities = []
            }

            state.entities.push(action.payload)
        }
    }
})

export const { usersRequested, usersRecieved, usersRequestFailed, authRequestSuccess, authRequestFailed, userCreated } = slice.actions

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
const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFailed = createAction('users/userCreateFailed')

const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateRequested())
    try {
        const { content } = await usersService.create(payload)
        dispatch(userCreated(content))
        customHistory.push('/users')
    } catch (e) {
        dispatch(userCreateFailed(e.message))
    }
}

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register({ email, password })
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({ userId: data.localId }))
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: getRandomInteger(1, 5),
            completedMeetings: getRandomInteger(0, 200),
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`,
            ...rest
        }))
    } catch (e) {
        dispatch(authRequestFailed(e.message))
    }
}

export const signIn = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
        const data = await authService.login({ email, password })
        dispatch(authRequestSuccess({ userId: data.localId }))
        localStorageService.setTokens(data)
        customHistory.push(redirect)
    } catch (e) {
        dispatch(authRequestFailed(e.message))
    }
}

export const getUserById = (id) => (state) => state.users.entities.find((user) => user._id === id)
export const getUsersList = () => (state) => state.users.entities

export default slice.reducer
