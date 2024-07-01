import { configureStore } from '@reduxjs/toolkit'
import warbandsSlice from './_warbandsSlice'
import warbandEquipmentSlice from './_warbandEquipmentSlice'
import warbandTroopsSlice from './_warbandTroopsSlice'

export default configureStore({
  reducer: {
    warbandEquipment: warbandEquipmentSlice,
    warbandTroops: warbandTroopsSlice,
    warbands: warbandsSlice
  }
})