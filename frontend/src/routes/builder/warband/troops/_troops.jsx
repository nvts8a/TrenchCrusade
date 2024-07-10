import { useLoaderData } from 'react-router-dom'

import Accordion from 'react-bootstrap/Accordion'
import AddNewTroop from './_addNewTroop'
import TroopCard from './_troopCard'
import { useDispatch, useSelector } from 'react-redux'
import { getTroops } from '../../../../store/_troopsActions'
import { useEffect } from 'react'

export default function Troops({warband}) {
    const dispatch = useDispatch()
    const loader = useLoaderData()
    const troops = useSelector(state => state.troops)

    useEffect(() => {
        if (warband && !troops.values[warband.id] && troops.loading === 'idle') dispatch(getTroops(warband))
    }, [dispatch, troops, warband])

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