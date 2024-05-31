import { useFactions, useFactionTroopTypes } from '../../../store/loaders'
import RosterTroopRow from './_rosterTroopRow'

export default function TroopDetails({warband, troops, removeTroop}) {
    /**
     * 
     * @returns 
     */
    const renderTroops = (filter) => {
        const renderRows = () => {
            return(
                troops
                .map((troop) => {
                    return({ 
                        troop: troop,
                        //factionTroopType: factionTroopTypes(warband.faction.id).find((type) => type.id === troop.troopType.id) 
                    })
                })
                .filter((troop) => troop.factionTroopType.type === filter)
                .map((troop) => {
                    return(<RosterTroopRow
                        factionTroopType={troop.factionTroopType}
                        troop={troop.troop}
                        warband={warband}
                        handleDelete={removeTroop(troop.troop, troop.factionTroopType)}
                        key={troop.troop.id} />)
                })
            )
        }

        return(
            <div className='row'>
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
            <h5 className='display-5 font-english-towne text-danger'>Elite</h5>
            {renderTroops('elite')}
            <h5 className='display-5 font-english-towne text-danger'>Troop</h5>
            {renderTroops('troop')}
        </div>
    )
}