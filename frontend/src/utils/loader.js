import { cache } from "./cache"

export const loader = async ({ 
    equipment=false, 
    factions=false, 
    factionEquipment=false, 
    factionTroopTypes=false, 
    keywords=false, 
    troopTypes=false 
}) => {
    let data = {}

    if (equipment)         data.equipment         = await cache('equipment/all')
    if (factions)          data.factions          = await cache('faction/all')
    if (factionEquipment)  data.factionEquipment  = await cache('faction/equipment/all')
    if (factionTroopTypes) data.factionTroopTypes = await cache('faction/troop-type/all')
    if (keywords)          data.keywords          = await cache('keyword/all')
    if (troopTypes)        data.troopTypes        = await cache('troop-type/all')

    return data
}