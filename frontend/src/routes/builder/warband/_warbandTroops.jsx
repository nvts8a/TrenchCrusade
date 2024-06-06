import { useFactionTroopTypes, useTroopTypes } from '../../../store/loaders'
import RosterTroopRow from './_rosterTroopRow'

export default function WarbandTroops({warband, troops, removeTroop, equipment, allFactionEquipment,
                                        allTroopEquipment, createTroopEquipment, removeTroopEquipment}) {
    const troopTypes = useTroopTypes()
    const factionTroopTypes = useFactionTroopTypes()
    
    const renderTroops = (troops, filter) => {
        const filteredTroops = troops.filter((troop) => factionTroopTypes[warband.factionId][troop.factionTroopTypeId].type === filter)

        if (filteredTroops.length < 1) return(<></>)

        const renderRows = () => {
            return(
                filteredTroops.map((troop) => {
                    return(
                        <RosterTroopRow
                            troop={troop}
                            allTroopEquipment={allTroopEquipment}
                            troopType={troopTypes[troop.troopTypeId]}
                            equipment={equipment}
                            allFactionEquipment={allFactionEquipment}
                            warband={warband}
                            handleDelete={removeTroop(troop, factionTroopTypes[warband.factionId][troop.factionTroopTypeId])}
                            handleCreateEquipment={createTroopEquipment(troop)}
                            handleRemoveEquipment={removeTroopEquipment(troop)}
                            key={troop.id} />
                    )
                })
            )
        }

        return(
            <div className='row'>
                <h5 className='display-5 font-english-towne text-danger'>{filter.charAt(0).toUpperCase() + filter.slice(1)}</h5>
                <table className='table mb-3 table-borderless'>
                    <thead>
                        <tr className='table-danger'>
                            <th className='col-2'>Name</th>
                            <th className='col-2'>Movement</th>
                            <th className='col-2'>Ranged</th>
                            <th className='col-2'>Melee</th>
                            <th className='col-2'>Armour</th>
                            <th className='col-2'>Keywords</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    return(
        <div className='mt-5'>
            {renderTroops(troops, 'elite')}
            {renderTroops(troops, 'troop')}
        </div>
    )
}