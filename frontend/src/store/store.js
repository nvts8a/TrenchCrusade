import { configureStore } from '@reduxjs/toolkit'
import equipmentSlice from './_equipmentSlice'
import factionSlice   from './_factionSlice'
import keywordSlice   from './_keywordSlice'
import rosterSlice    from './_rosterSlice'
import troopTypeSlice from './_troopTypeSlice'
import warbandSlice   from './_warbandSlice'
import factionEquipmentSlice from './_factionEquipmentSlice'
import factionTroopTypeSlice from './_factionTroopType'

export default configureStore({
  reducer: {
    equipment:  equipmentSlice,
    factions:   factionSlice,
    factionEquipment:  factionEquipmentSlice,
    factionTroopTypes: factionTroopTypeSlice,
    keywords:   keywordSlice,
    rosters:    rosterSlice,
    troopTypes: troopTypeSlice,
    warbands:   warbandSlice,
  }
})