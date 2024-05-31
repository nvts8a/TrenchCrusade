// REACT
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '../../../components/_pageLayout';

// REDUX
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setWarband } from '../../../store/_warbandSlice'
import { useFactionEquipment, useFactionTroopTypes, useFactions, useTroopTypes, useWarbands} from '../../../store/loaders';
import FactionDetails from './_factionDetails';
import AssetDetails from './_assetDetails';
import TroopDetails from './_troopDetails';
import AddNewTroop from './_addNewTroop';


export default function Roster() {
    const dispatch = useDispatch()
    const params   = useParams()
    const warbands = useWarbands()

    const troopTypes = useTroopTypes()
    const factions = useFactions()
    const factionEquipment = useFactionEquipment()
    const factionTroopTypes = useFactionTroopTypes()

    const [troops,  setTroops]  = useState([])
    // Troops is always loaded and kept exclusively on this page
    useEffect(() => {
        axios(`/api/warband/${params.id}/troop/all`)
        .then((response) => setTroops(response.data))
        .catch((err)     => console.log(err.message))
    }, [])


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

    const createTroop = (factionTroopType, troopType) => (event) => {
        event.preventDefault()
        axios.post(`/api/warband/${params.id}/troop`, {
            'warband':   { id: warband.id },
            'troopType': troopType, 
            'name':      troopType.name
        })
        .then(() => updateWarband({ target: { id: 'ducats', value: warband.ducats - factionTroopType.cost }}))
        .catch((err) => console.log(err.message))
    }

    const removeTroop = (troop, factionTroopType) => () => {
        axios.delete(`/api/warband/${params.id}/troop/${troop.id}`)
        .then(() => updateWarband({ target: { id: 'ducats', value: warband.ducats + factionTroopType.cost }}))
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
    
                <FactionDetails warband={warband}
                                factions={factions}
                                updateWarband={updateWarband} />

                <AssetDetails   warband={warband}
                                updateWarband={updateWarband} />

                <TroopDetails   warband={warband}
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