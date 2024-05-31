import { createSlice } from '@reduxjs/toolkit'

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: {
      pending: true,
      values: {}
  },
  reducers: {
        setEquipment: (state, action) => {
            state.pending = false
            state.values = action.payload
        }
    }
})

export const { setEquipment } = equipmentSlice.actions

export default equipmentSlice.reducer