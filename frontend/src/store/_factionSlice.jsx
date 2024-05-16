import { createSlice } from '@reduxjs/toolkit'

export const factionSlice = createSlice({
  name: 'factions',
  initialState: {
      pending: true,
      values: {}
  },
  reducers: {
        setFaction: (state, action) => {
            state.pending = false
            state.values = Object.fromEntries(
                action.payload.map((faction) => [faction.id, faction])
            )
        }
    }
})

export const { setFaction } = factionSlice.actions

export default factionSlice.reducer