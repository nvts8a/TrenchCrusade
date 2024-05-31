import { createSlice } from '@reduxjs/toolkit'

export const factionTroopTypeSlice = createSlice({
  name: 'factionTroopTypes',
  initialState: {
      pending: true,
      values: {}
  },
  reducers: {
        setFactionTroopTypes: (state, action) => {
            state.pending = false
            state.values = action.payload
        }
    }
})

export const { setFactionTroopTypes } = factionTroopTypeSlice.actions

export default factionTroopTypeSlice.reducer