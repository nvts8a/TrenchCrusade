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
            state.values = Object.fromEntries(
                action.payload.map((equipable) => [equipable.id, equipable])
            )
        }
    }
})

export const { setEquipment } = equipmentSlice.actions

export default equipmentSlice.reducer