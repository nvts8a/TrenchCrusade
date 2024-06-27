import { configureStore } from '@reduxjs/toolkit'
import warbandSlice   from './_warbandSlice'

export default configureStore({
  reducer: {
    warbands:   warbandSlice,
  }
})