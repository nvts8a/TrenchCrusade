import { createSlice } from '@reduxjs/toolkit'

const IDLE        = 'idle'
const PENDING     = 'pending'

export const warbandsSlice = createSlice({
    name: 'warbands',
    initialState: {
        loading: IDLE,
        uninitialized: true,
        values: {},
    },
    reducers: {
        warbandsLoading(state) {
            if (state.loading === IDLE) state.loading = PENDING
        },
        warbandsRecieved(state, action) {
            if (state.loading === PENDING) {
                state.uninitialized = false
                state.loading = IDLE
                state.values = action.payload
            }
        },
        warbandRecieved(state, action) {
            if (state.loading !== PENDING) {
                state.values[action.payload.id] = action.payload
            }
        },
        warbandDeleted: (state, action) => {
            if (state.loading !== PENDING) {
                delete state.values[action.payload]
            }
        },
        clearWarbands: (state) => {
            state.values = {}
            state.loading = IDLE
            state.uninitialized = true
        }
    }
})

export const { clearWarbands, warbandDeleted, warbandRecieved, warbandsLoading, warbandsRecieved } = warbandsSlice.actions

export default warbandsSlice.reducer