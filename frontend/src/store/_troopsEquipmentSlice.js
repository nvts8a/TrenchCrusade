import { createSlice } from '@reduxjs/toolkit'

const IDLE    = 'idle'
const PENDING = 'pending'

export const troopEquipmentSlice = createSlice({
    name: 'troopEquipment',
    initialState: {
        loading: IDLE,
        values: {},
    },
    reducers: {
        equipableDeleted: (state, action) => {
            if (state.loading !== PENDING) {
                state.values[action.payload.troopId].splice(action.payload.indexToDelete, 1)
            }
        },
        equipableRecieved(state, action) {
            if (state.loading !== PENDING) {
                state.values[action.payload.troopId].push(action.payload.equipable)
            }
        },
        equipmentLoading(state) {
            if (state.loading === IDLE) state.loading = PENDING
        },
        equipmentRecieved(state, action) {
            if (state.loading === PENDING) {
                state.loading = IDLE
                state.values[action.payload.troopId] = action.payload.equipment
            }
        },
        clearEquipment: (state) => {
            state.values = {}
            state.loading = IDLE
        }
    }
})

export const { equipableDeleted, equipableRecieved, equipmentLoading, equipmentRecieved, clearEquipment } = troopEquipmentSlice.actions

export default troopEquipmentSlice.reducer