import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    entities: null,
    isLoading: true
}

const slice = createSlice({
    name: 'qualities',
    initialState
})

export default slice.reducer
