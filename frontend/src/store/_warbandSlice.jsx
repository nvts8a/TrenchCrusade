import { createSlice } from '@reduxjs/toolkit'

export const warbandSlice = createSlice({
    name: 'warbands',
    initialState: {
        pending: true,
        values: {},
    },
    reducers: {
        deleteWarbands: (state) => {
            state.values = {}
            state.pending = true
        },
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
        }
    }
})

export const { deleteWarbands, deleteWarband, setWarband, setWarbands } = warbandSlice.actions

export default warbandSlice.reducer