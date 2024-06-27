import { configureStore } from '@reduxjs/toolkit'
import warbandsSlice   from './_warbandsSlice'

export default configureStore({
  reducer: {
    warbands: warbandsSlice,
  }
})