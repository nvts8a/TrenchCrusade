import { configureStore } from '@reduxjs/toolkit'
import rosterReducer  from './routes/builder/warband/rosterSlice'
import warbandReducer from './routes/builder/warbandSlice'

export default configureStore({
  reducer: {
    warbands: warbandReducer,
    rosters:  rosterReducer
  }
})