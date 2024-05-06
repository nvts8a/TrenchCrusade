import { createSlice } from '@reduxjs/toolkit'

export const rosterSlice = createSlice({
    name: 'rosters',
    initialState: {
        value: {}
    },
    reducers: {
        addRoster: (state, action) => {
            state.value[action.payload.warbandId] = action.payload.troops
        },
        deleteRoster: (state, action) => {
            delete state.value[action.payload]
        },
        addToRoster: (state, action) => {
            state.value[action.payload.wardbandId].push(action.payload.troop)
        },
        deleteFromRoster: (state, action) => {
            state.value[action.payload.wardbandId] = state.value[action.payload.wardbandId].filter((troop) => troop.id !== action.payload.troop.id)
        }
    }
})

export const { addRoster, addToRoster, deleteFromRoster, deleteRoster } = rosterSlice.actions

export default rosterSlice.reducer