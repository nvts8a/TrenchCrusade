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
            state.values = Object.fromEntries(
                action.payload.map((troopType) => [troopType.id, troopType])
            )
        }
    }
})

export const { setTroopTypes } = troopTypeSlice.actions

export default troopTypeSlice.reducer