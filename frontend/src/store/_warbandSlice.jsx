import { createSlice } from '@reduxjs/toolkit'

export const warbandSlice = createSlice({
    name: 'warbands',
    initialState: {
        pending: true,
        values: {}
    },
    reducers: {
        // Warband Slice
        deleteWarband: (state, action) => {
            delete state.values[action.payload]
        },
        setWarband: (state, action) => {
            state.values[action.payload.id] = action.payload
        },
        setWarbands: (state, action) => {
            state.pending = false
            state.values = Object.fromEntries(
                action.payload.map((warband) => [warband.id, warband])
            )
        },
        // Roster Slice
        deleteTroop: () => {},
        // Equipment Slice
    }
})

export const { deleteWarband, setWarband, setWarbands } = warbandSlice.actions

export default warbandSlice.reducer