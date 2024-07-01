import { useLoaderData } from 'react-router-dom'

import Accordion from 'react-bootstrap/Accordion'
import AddNewTroop from './_addNewTroop'
import TroopCard from './_warbandTroopCard'

export default function WarbandTroops({warband, troops}) {
    const loader = useLoaderData()

    if (!troops.values[warband.id]) return(<></>)

    const warbandTroops = troops.values[warband.id]
    const factionTroopTypes = loader.factionTroopTypes[warband.factionId]

    const renderTroopCards = (filter) => {
        const filteredTroops = Object.values(warbandTroops).filter((troop) => factionTroopTypes[troop.factionTroopTypeId].type === filter)
        if (filteredTroops.length < 1) return(<></>)

        const troopCards = filteredTroops.map((troop) => <TroopCard key={troop.id} troop={troop} warband={warband} rostered />)
        
        return(
            <Accordion key={filter}>
                <h5 className='display-5 font-english-towne text-center text-danger'>{filter.charAt(0).toUpperCase() + filter.slice(1)}</h5>
                {troopCards}
            </Accordion>
        )
    }

    return(
        <>
            <AddNewTroop warband={warband} />
            {renderTroopCards('elite')}
            {renderTroopCards('troop')}
        </>
    )
}