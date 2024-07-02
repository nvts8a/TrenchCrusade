import { configureStore }    from '@reduxjs/toolkit'
import troopsEquipmentSlice  from './_troopsEquipmentSlice'
import troopsUpgradesSlice   from './_troopsUpgradesSlice'
import warbandsSlice         from './_warbandsSlice'
import warbandEquipmentSlice from './_warbandEquipmentSlice'
import warbandTroopsSlice    from './_warbandTroopsSlice'

export default configureStore({
  reducer: {
    troopsEquipment: troopsEquipmentSlice,
    troopsUpgrades: troopsUpgradesSlice,
    warbandEquipment: warbandEquipmentSlice,
    warbandTroops: warbandTroopsSlice,
    warbands: warbandsSlice
  }
})