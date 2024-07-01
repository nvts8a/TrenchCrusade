import { createSlice } from '@reduxjs/toolkit'

const IDLE        = 'idle'
const PENDING     = 'pending'

export const warbandTroopsSlice = createSlice({
    name: 'warbandTroops',
    initialState: {
        loading: IDLE,
        values: {},
    },
    reducers: {
        troopDeleted: (state, action) => {
            if (state.loading !== PENDING) {
                delete state.values[action.payload.warbandId][action.payload.troopId]
            }
        },
        troopRecieved(state, action) {
            if (state.loading !== PENDING) {
                state.values[action.payload.warbandId][action.payload.troop.id] = action.payload.troop
            }
        },
        troopsLoading(state) {
            if (state.loading === IDLE) state.loading = PENDING
        },
        troopsRecieved(state, action) {
            if (state.loading === PENDING) {
                state.loading = IDLE
                state.values[action.payload.warbandId] = action.payload.troops
            }
        },
        clearTroops: (state) => {
            state.values = {}
            state.loading = IDLE
        }
    }
})

export const { troopDeleted, troopRecieved, troopsLoading, troopsRecieved, clearTroops } = warbandTroopsSlice.actions

export default warbandTroopsSlice.reducer