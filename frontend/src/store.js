import { configureStore } from '@reduxjs/toolkit'
import warbandReducer from './routes/builder/warbandSlice'

export default configureStore({
  reducer: {
    warbands: warbandReducer
  }
})