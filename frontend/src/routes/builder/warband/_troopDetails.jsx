import { useFactions } from '../../../store/loaders'
import RosterTroopCard from './_rosterTroopCard'

export default function TroopDetails({warband, createTroop, removeTroop}) {
    const factions = useFactions()
    const troopTypes = (id) => factions[id] ? factions[id].factionTroopTypes : []

    /**
     * 
     * @returns 
     */
    const renderTroops = () => {
        return(warband.troops.map((troop) => {
            const factionTroopType = troopTypes(warband.faction.id).find((type) => type.id === troop.troopType.id)

            return(<RosterTroopCard
                factionTroopType={factionTroopType}
                troop={troop}
                warband={warband}
                handleDelete={removeTroop(troop, factionTroopType)}
                key={troop.id} 
            />)
        }))
    }

    /**
     * 
     * @returns 
     */
    const renderAddNewTroop = () => {
        return(
            <ul className='list-group list-group-horizontal row w-100 danger' id='new-troop' key='new'>
                <li className='list-group-item list-group-item-danger col-12 dropdown font-artisan'>
                    <button className='btn btn-danger dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                        New Troop
                    </button>
                    <ul className='dropdown-menu'>
                        {renderTroopTypeDropdownItems()}
                    </ul>
                </li>
            </ul>
        )
    }

    /**
     * 
     * @returns 
     */
    const renderTroopTypeDropdownItems = () => {
        return Object.values(troopTypes(warband.faction.id)).map((factionTroopType) => {
            const troopType = factionTroopType.troopType
            return(
                <li className='dropdown-item' onClick={() => createTroop(factionTroopType)} 
                    id={`faction-${troopType.id}`} key={troopType.id}>
                    {troopType.name}
                </li>
            )
        })
    }

    return(
        <div className='row'>
            <h5 className='font-english-towne'>Troops</h5>
            {renderTroops()}
            {renderAddNewTroop()}
        </div>
    )
}