import { createSlice } from '@reduxjs/toolkit'

export const troopTypeSlice = createSlice({
  name: 'troopTypes',
  initialState: {
      pending: true,
      values: {}
  },
  reducers: {
        setTroopTypes: (state, action) => {
            state.pending = false
            state.values = action.payload
        }
    }
})

export const { setTroopTypes } = troopTypeSlice.actions

export default troopTypeSlice.reducer