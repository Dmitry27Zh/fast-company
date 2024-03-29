import { createAction, createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { getRandomInteger } from '../utils'
import { customHistory } from '../router/CustomBrowserRouter'
import { generateAuthError } from '../utils/generateAuthError'

const localUserId = localStorageService.getUserId()

const initialState = {
    entities: [],
    isLoading: !!localUserId,
    error: null,
    auth: localUserId ? { userId: localUserId } : null,
    isLoggedIn: !!localUserId,
    dataLoaded: false
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
            state.dataLoaded = true
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            if (state.entities == null) {
                state.entities = []
            }

            state.entities.push(action.payload)
        },
        userUpdated: (state, action) => {
            state.entities = state.entities.map((user) => {
                if (user._id === state.auth.userId) {
                    return {
                        ...user,
                        ...action.payload
                    }
                } else {
                    return user
                }
            })
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        authRequested: (state) => {
            state.error = null
        }
    }
})

export const { usersRequested, usersRecieved, usersRequestFailed, authRequestSuccess, authRequestFailed, userCreated, userUpdated, userLoggedOut, authRequested } = slice.actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await usersService.get()
        dispatch(usersRecieved(content))
    } catch (e) {
        dispatch(usersRequestFailed(e.message))
    }
}

const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFailed = createAction('users/userCreateFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

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

export const updateUser = (payload) => async (dispatch, getState) => {
    dispatch(userUpdateRequested())
    try {
        const { content } = await usersService.update(getState().users.auth.userId, payload)
        const update = Array.isArray(content)
            ? {
                [Object.keys(payload)[0]]: content[0]
            }
            : content
        dispatch(userUpdated(update))
    } catch (e) {
        dispatch(userUpdateFailed(e.message))
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
        const { code, message } = e.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(e.message))
        }
    }
}

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    customHistory.push('/')
}

export const getUserById = (id) => (state) => state.users.entities.find((user) => user._id === id)
export const getUsersList = () => (state) => state.users.entities
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getCurrentUserId = () => (state) => state.users.auth.userId
export const getCurrentUser = () => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === state.users.auth.userId)
    } else {
        return null
    }
}
export const getAuthErrors = () => (state) => state.users.error

export default slice.reducer
