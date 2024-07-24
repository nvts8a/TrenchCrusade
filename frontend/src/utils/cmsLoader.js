import { get } from "./get"

export const cmsLoader = async () => {

    let data = {}
    data.keywords = await get('cms/keyword/all')


    //if (equipment)         data.equipment         = await cache('equipment/all')
    //if (factions)          data.factions          = await cache('faction/all')
    //if (factionEquipment)  data.factionEquipment  = await cache('faction/equipment/all')
    //if (factionTroopTypes) data.factionTroopTypes = await cache('faction/troop-type/all')
    //if (troopTypes)        data.troopTypes        = await cache('troop-type/all')

    return data
}