// REACT
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '../../../components/_pageLayout';

// REDUX
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useEquipment, useFactionEquipment, useFactionTroopTypes, useFactions, useTroopTypes, useWarbands} from '../../../store/loaders';
import WarbandFaction from './_warbandFaction';
import WarbandAssets from './_warbandAssets';
import WarbandTroops from './_warbandTroops';
import AddNewTroop from './_addNewTroop';
import { updateWarband, createEquipment, removeEquipment, createTroop, removeTroop } from '../_builderActions';

export default function Roster() {
    const dispatch = useDispatch()
    const params   = useParams()
    const warbands = useWarbands()

    const equipment = useEquipment()
    const troopTypes = useTroopTypes()
    const factions = useFactions()
    const factionEquipment = useFactionEquipment()
    const factionTroopTypes = useFactionTroopTypes()

    const [troops, setTroops]  = useState([])
    const addTroop = (troop) => {
        dispatch(setTroops(troops.concat(troop)))
    }
    const findAndRemoveTroop = (troopRemoved) => {
        troops.splice(troops.findIndex((troop) => troop.id === troopRemoved.id), 1)
        dispatch(setTroops(troops))
    }

    const [warbandEquipment, setWarbandEquipment]  = useState([])
    const addWarbandEquipable = (equipable) => {
        setWarbandEquipment(warbandEquipment.concat(equipable))
    }
    const findAndRemoveWarbandEquipable = (factionEquipable) => {
        const equipmentRemovedIndex = warbandEquipment.findIndex((warbandEquipable) => warbandEquipable.equipmentId === factionEquipable.equipmentId)
        
        if (equipmentRemovedIndex > -1) return warbandEquipment.splice(equipmentRemovedIndex, 1)[0]
        return false
    }

    // Troops is always loaded and kept exclusively on this page
    useEffect(() => {
        axios(`warband/${params.id}/troop/all`)
        .then((response) => setTroops(response.data))
        .catch((err)     => console.log(err.message))
        axios(`warband/${params.id}/equipment/all`)
        .then((response) => setWarbandEquipment(response.data))
        .catch((err)     => console.log(err.message))
    }, [params])


    if (!warbands[params.id]) return(<></>)
    if (!troops)              return(<></>)

    const warband = warbands[params.id]
    
    if (warband) {
        return(
            <PageLayout pageName='Warband Roster'>
                <div className='row'>
                    <div className='input-group mb-3'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Warband Name</span>
                        <input type='text' className='form-control' placeholder='Warband Name' aria-label='Warband Name' aria-describedby='basic-addon2'
                            id='name' defaultValue={warband.name} onInput={updateWarband(params.id, dispatch)}/>
                    </div>
                </div>
    
                <WarbandFaction warband={warband}
                                factions={factions}
                                updateWarband={updateWarband(params.id, dispatch)} />

                <WarbandAssets  warband={warband}
                                warbandEquipment={warbandEquipment}
                                equipment={equipment}
                                allFactionEquipment={factionEquipment}
                                updateWarband={updateWarband(params.id, dispatch)}
                                createEquipment={createEquipment(warband, dispatch, updateWarband, addWarbandEquipable)} 
                                removeEquipment={removeEquipment(warband, dispatch, updateWarband, findAndRemoveWarbandEquipable)} />

                <WarbandTroops  warband={warband}
                                troops={troops}
                                removeTroop={removeTroop(warband, dispatch, findAndRemoveTroop)} />

                <AddNewTroop    warband={warband}
                                allFactionTroopTypes={factionTroopTypes}
                                troopTypes={troopTypes}
                                createTroop={createTroop(warband, dispatch, addTroop)}/>

            </PageLayout>
            )
        }

        return(<></>)
}