import { configureStore } from '@reduxjs/toolkit'
import warbandsSlice from './_warbandsSlice'
import warbandEquipmentSlice from './_warbandEquipmentSlice'

export default configureStore({
  reducer: {
    warbandEquipment: warbandEquipmentSlice,
    warbands: warbandsSlice
  }
})