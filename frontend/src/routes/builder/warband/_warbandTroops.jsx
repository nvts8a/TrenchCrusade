// REACT
import { useEffect, useState } from 'react';
import TroopCard from './_warbandTroopsCard'
import AddNewTroop from './_addNewTroop';
import Accordion from 'react-bootstrap/Accordion';

// REDUX
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useFactionTroopTypes, useTroopTypes } from '../../../store/loaders'
import { createTroop } from '../_builderActions';

export default function WarbandTroops({warband, updateWarband}) {
    const dispatch = useDispatch()
    const troopTypes = useTroopTypes()
    const factionTroopTypes = useFactionTroopTypes()

    const [troops, setTroops]  = useState([])
    const addTroop = (troop) => {
        dispatch(setTroops(troops.concat(troop)))
    }
    /*
    const findAndRemoveTroop = (troopRemoved) => {
        troops.splice(troops.findIndex((troop) => troop.id === troopRemoved.id), 1)
        dispatch(setTroops(troops))
    }*/

    useEffect(() => {
        axios(`warband/${warband.id}/troop/all`)
        .then((response) => setTroops(response.data))
        .catch((err) => console.log(err.message))
    }, [warband])

    if (!troops) return(<></>)

    const renderTroopCards = (troops, filter) => {
        const filteredTroops = troops.filter((troop) => factionTroopTypes[warband.factionId][troop.factionTroopTypeId].type === filter)
        if (filteredTroops.length < 1) return(<></>)

        const troopCards = () => filteredTroops.map((troop) => <TroopCard troop={troop} key={troop.id} />)
        return(
            <Accordion key={filter}>
                <h5 className='display-5 font-english-towne text-danger'>{filter.charAt(0).toUpperCase() + filter.slice(1)}</h5>
                {troopCards()}
            </Accordion>
        )
    }

    return(
    <>
        <div className='col-sm-3 col-md-1' key='add-new'>
            <AddNewTroop
                warband={warband}
                allFactionTroopTypes={factionTroopTypes} troopTypes={troopTypes}
                createTroop={createTroop(warband, dispatch, addTroop)}/>
        </div>
        {renderTroopCards(troops, 'elite')}
        {renderTroopCards(troops, 'troop')}
    </>
    )
}