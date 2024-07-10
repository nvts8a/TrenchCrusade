import { createSlice } from '@reduxjs/toolkit'

const IDLE        = 'idle'
const PENDING     = 'pending'

export const troopsSlice = createSlice({
    name: 'troops',
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
        },

        // Equipment
        equipableDeleted: (state, action) => {
            state.values[action.payload.troop.warbandId][action.payload.troop.id].equipment.splice(action.payload.indexToDelete, 1)
        },
        equipableRecieved(state, action) {
            state.values[action.payload.troop.warbandId][action.payload.troop.id].equipment.push(action.payload.equipable)
        },

        // Upgrades
        upgradeDeleted: (state, action) => {
            state.values[action.payload.troop.warbandId][action.payload.troop.id].upgrades.splice(action.payload.indexToDelete, 1)
        },
        upgradeRecieved(state, action) {
            state.values[action.payload.troop.warbandId][action.payload.troop.id].upgrades.push(action.payload.upgrade)
        }
    }
})

export const {  troopDeleted, troopRecieved, troopsLoading, troopsRecieved, clearTroops,
                equipableDeleted, equipableRecieved, upgradeDeleted, upgradeRecieved  } = troopsSlice.actions

export default troopsSlice.reducer