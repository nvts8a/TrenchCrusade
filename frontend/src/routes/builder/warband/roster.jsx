// REACT
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '../../../components/_pageLayout';

// REDUX
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setWarband } from '../../../store/_warbandSlice'
import { useEquipment, useFactionEquipment, useFactionTroopTypes, useFactions, useTroopTypes, useWarbands} from '../../../store/loaders';
import WarbandFaction from './_warbandFaction';
import WarbandAssets from './_warbandAssets';
import WarbandTroops from './_warbandTroops';
import AddNewTroop from './_addNewTroop';

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
    const [warbandEquipment, setWarbandEquipment]  = useState([])
    
    // Troops is always loaded and kept exclusively on this page
    useEffect(() => {
        axios(`/api/warband/${params.id}/troop/all`)
        .then((response) => setTroops(response.data))
        .catch((err)     => console.log(err.message))
        axios(`/api/warband/${params.id}/equipment/all`)
        .then((response) => setWarbandEquipment(response.data))
        .catch((err)     => console.log(err.message))
    }, [params])


    if (!warbands[params.id]) return(<></>)
    if (!troops)              return(<></>)

    const warband = warbands[params.id]

    const updateWarband = (event) => {
        let updates = {}
        updates[event.target.id] = event.target.value

        axios.patch(`/api/warband/${params.id}`, updates)
        .then((response) => dispatch(setWarband(response.data)))
        .catch((err) => console.log(err.message))
    }

    const createEquipment = (factionEquipment, equipment) => () => {
        axios.post(`/api/warband/${params.id}/equipment`, {
            'factionEquipment': factionEquipment,
            'equipment':        equipment
        })
        .then((response) => {
            updateWarband({ target: { id: 'ducats', value: warband.ducats - factionEquipment.cost }})
            setWarbandEquipment(warbandEquipment.concat(response.data))
        })
        .catch((err) => console.log(err.message))
    }

    const removeEquipment = (factionEquipment, equipment) => () => {
        const equipmentRemovedIndex = warbandEquipment.findIndex((equipable) => equipable.equipmentId === equipment.id)

        if (equipmentRemovedIndex > 0) {
            axios.delete(`/api/warband/${params.id}/equipment/${warbandEquipment[equipmentRemovedIndex].id}`)
            .then(() => {
                updateWarband({ target: { id: 'ducats', value: warband.ducats + factionEquipment.cost}})
                warbandEquipment.splice(equipmentRemovedIndex, 1)
            })
            .catch((err) => console.log(err.message))
        }
    }

    const createTroop = (factionTroopType, troopType) => () => {
        axios.post(`/api/warband/${params.id}/troop`, {
            'factionTroopType': factionTroopType,
            'troopType':        troopType, 
            'name':             troopType.name
        })
        .then((response) => {
            updateWarband({ target: { id: 'ducats', value: warband.ducats - factionTroopType.cost }})
            setTroops(troops.concat(response.data))
        })
        .catch((err) => console.log(err.message))
    }

    const removeTroop = (troopRemoved, factionTroopType) => () => {
        axios.delete(`/api/warband/${params.id}/troop/${troopRemoved.id}`)
        .then(() => {
            updateWarband({ target: { id: 'ducats', value: warband.ducats + factionTroopType.cost }})
            troops.splice(troops.findIndex((troop) => troop.id === troopRemoved.id), 1)
        })
        .catch((err) => console.log(err.message))
    }
    
    if (warband) {
        return(
            <PageLayout pageName='Warband Roster'>
                <div className='row'>
                    <div className='input-group mb-3'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Warband Name</span>
                        <input type='text' className='form-control' placeholder='Warband Name' aria-label='Warband Name' aria-describedby='basic-addon2'
                            id='name' defaultValue={warband.name} onInput={updateWarband}/>
                    </div>
                </div>
    
                <WarbandFaction warband={warband}
                                factions={factions}
                                updateWarband={updateWarband} />

                <WarbandAssets  warband={warband}
                                warbandEquipment={warbandEquipment}
                                equipment={equipment}
                                allFactionEquipment={factionEquipment}
                                updateWarband={updateWarband}
                                createEquipment={createEquipment} 
                                removeEquipment={removeEquipment} />

                <WarbandTroops   warband={warband}
                                troops={troops}
                                removeTroop={removeTroop} />

                <AddNewTroop    warband={warband}
                                allFactionTroopTypes={factionTroopTypes}
                                troopTypes={troopTypes}
                                createTroop={createTroop}/>

            </PageLayout>
            )
        }

        return(<></>)
}