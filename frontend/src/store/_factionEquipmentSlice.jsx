import { createSlice } from '@reduxjs/toolkit'

export const factionEquipmentSlice = createSlice({
  name: 'factionEquipment',
  initialState: {
      pending: true,
      values: {}
  },
  reducers: {
        setFactionEquipment: (state, action) => {
            state.pending = false
            state.values = action.payload
        }
    }
})

export const { setFactionEquipment } = factionEquipmentSlice.actions

export default factionEquipmentSlice.reducer