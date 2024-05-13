import { createSlice } from '@reduxjs/toolkit'

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState: {
      pending: true,
      values: {}
  },
  reducers: {
        setKeywords: (state, action) => {
            state.pending = false
            state.values = Object.fromEntries(
                action.payload.map((keyword) => [keyword.id, keyword])
            )
        }
    }
})

export const { setKeywords } = keywordSlice.actions

export default keywordSlice.reducer