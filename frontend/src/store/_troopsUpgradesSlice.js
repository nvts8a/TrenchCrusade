import { createSlice } from '@reduxjs/toolkit'

const IDLE    = 'idle'
const PENDING = 'pending'

export const troopsUpgradesSlice = createSlice({
    name: 'troopsUpgrades',
    initialState: {
        loading: IDLE,
        values: {},
    },
    reducers: {
        upgradeDeleted: (state, action) => {
            if (state.loading !== PENDING) {
                state.values[action.payload.troopId].splice(action.payload.indexToDelete, 1)
            }
        },
        upgradeRecieved(state, action) {
            if (state.loading !== PENDING) {
                state.values[action.payload.troopId].push(action.payload.upgrade)
            }
        },
        upgradesLoading(state) {
            if (state.loading === IDLE) state.loading = PENDING
        },
        upgradesRecieved(state, action) {
            if (state.loading === PENDING) {
                state.loading = IDLE
                state.values[action.payload.troopId] = action.payload.upgrades
            }
        },
        clearUpgrades: (state) => {
            state.values = {}
            state.loading = IDLE
        }
    }
})

export const { upgradeDeleted, upgradeRecieved, upgradesLoading, upgradesRecieved, clearUpgrades } = troopsUpgradesSlice.actions

export default troopsUpgradesSlice.reducer