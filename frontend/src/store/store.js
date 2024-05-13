import { configureStore } from '@reduxjs/toolkit'
import equipmentSlice from './_equipmentSlice'
import factionSlice   from './_factionSlice'
import keywordSlice   from './_keywordSlice'
import rosterSlice    from './_rosterSlice'
import warbandSlice   from './_warbandSlice'

export default configureStore({
  reducer: {
    equipment:  equipmentSlice,
    factions:   factionSlice,
    keywords:   keywordSlice,
    rosters:    rosterSlice,
    warbands:   warbandSlice,
  }
})