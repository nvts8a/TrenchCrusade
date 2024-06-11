// REACT
import { useEffect, useState } from 'react'
import TroopCard from './_warbandTroopsCard'
import AddNewTroop from './_addNewTroop'
import Accordion from 'react-bootstrap/Accordion'

// REDUX
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { createTroop, removeTroop, createTroopEquipment, removeTroopEquipment, updateWarband } from '../_builderActions'

export default function WarbandTroops({warband, allTroopTypes, factionTroopTypes, factionEquipment}) {
    const dispatch = useDispatch()

    const [troops, setTroops]  = useState([])
    const addTroop = (troop) => {
        dispatch(setTroops(troops.concat(troop)))
    }
    
    const findAndRemoveTroop = (troopRemoved) => {
        troops.splice(troops.findIndex((troop) => troop.id === troopRemoved.id), 1)
        dispatch(setTroops(troops))
    }

    useEffect(() => {
        axios(`warband/${warband.id}/troop/all`)
        .then((response) => setTroops(response.data))
        .catch((err) => console.log(err.message))
    }, [warband])

    if (!troops || !allTroopTypes || !factionTroopTypes) return(<></>)

    const renderTroopCards = (troops, filter) => {
        const filteredTroops = troops.filter((troop) => factionTroopTypes[troop.factionTroopTypeId].type === filter)
        if (filteredTroops.length < 1) return(<></>)

        const troopCards = filteredTroops.map((troop) => <TroopCard key={troop.id} troop={troop} rostered
                factionTroopType={factionTroopTypes[troop.factionTroopTypeId]}
                removeTroop={removeTroop(warband, dispatch, findAndRemoveTroop)}
                factionEquipment={factionEquipment}
                createTroopEquipment={createTroopEquipment(warband, dispatch, updateWarband)} 
                removeTroopEquipment={removeTroopEquipment(warband, dispatch, updateWarband)}/>)
        
        return(
            <Accordion key={filter}>
                <h5 className='display-5 font-english-towne text-center text-danger'>{filter.charAt(0).toUpperCase() + filter.slice(1)}</h5>
                {troopCards}
            </Accordion>
        )
    }

    return(
    <>
        <AddNewTroop
            factionTroopTypes={factionTroopTypes}
            allTroopTypes={allTroopTypes}
            createTroop={createTroop(warband, dispatch, addTroop)}/>
        {renderTroopCards(troops, 'elite')}
        {renderTroopCards(troops, 'troop')}
    </>
    )
}