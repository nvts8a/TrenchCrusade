import { createSlice } from '@reduxjs/toolkit'

export const factionSlice = createSlice({
  name: 'factions',
  initialState: {
      pending: true,
      values: {}
  },
  reducers: {
        setFactions: (state, action) => {
            state.pending = false
            state.values = action.payload
        }
    }
})

export const { setFactions } = factionSlice.actions

export default factionSlice.reducer