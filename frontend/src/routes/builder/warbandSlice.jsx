import { createSlice } from '@reduxjs/toolkit'

export const warbandSlice = createSlice({
  name: 'warbands',
  initialState: {
    value: []
  },
  reducers: {
    addWarband: (state, action) => {
      state.value.push(action.payload)
    },
    deleteWarband: (state, action) => {
      state.value = state.value.filter((warband) => warband.id != action.payload)
    },
    setWarbands: (state, action) => { 
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addWarband, deleteWarband, setWarbands } = warbandSlice.actions

export default warbandSlice.reducer