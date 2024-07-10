import { configureStore }    from '@reduxjs/toolkit'
import troopsSlice           from './_troopsSlice'
import warbandsSlice         from './_warbandsSlice'
import warbandEquipmentSlice from './_warbandEquipmentSlice'

export default configureStore({
  reducer: {
    troops: troopsSlice,
    warbandEquipment: warbandEquipmentSlice,
    warbands: warbandsSlice
  }
})