// REACT
import { useLoaderData, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '../../../components/_pageLayout';
import WarbandFaction from './_warbandFaction';
import WarbandAssets from './_warbandAssets';
import WarbandTroops from './_warbandTroops';

// REDUX
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useWarbands} from '../../../store/loaders';
import { updateWarband, createEquipment, removeEquipment } from '../_builderActions';

export default function Roster() {
    const dispatch = useDispatch()
    const loader = useLoaderData()

    const params   = useParams()
    const warbands = useWarbands()
    const [warbandEquipment, setWarbandEquipment]  = useState([])
    const addWarbandEquipable = (equipable) => {
        setWarbandEquipment(warbandEquipment.concat(equipable))
    }
    const findAndRemoveWarbandEquipable = (factionEquipable) => {
        const equipmentRemovedIndex = warbandEquipment.findIndex((warbandEquipable) => warbandEquipable.equipmentId === factionEquipable.equipmentId)
        
        if (equipmentRemovedIndex > -1) return warbandEquipment.splice(equipmentRemovedIndex, 1)[0]
        return false
    }

    useEffect(() => {
        axios(`warband/${params.id}/equipment/all`)
        .then((response) => setWarbandEquipment(response.data))
        .catch((err)     => console.log(err.message))
    }, [params])

    if (!warbands) return(<></>) 
    const warband = warbands[params.id]

    if (!warband) return(<></>) 

    return(
        <>
        <PageLayout pageName='Roster'>
            <h5 className='display-5 font-english-towne text-center text-danger'>Warband</h5>
            <div className='row justify-content-center'>
                <div className='col-sm-12 col-md-5 mb-3'>
                    <div className='input-group'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Warband Name</span>
                        <input type='text' className='form-control' placeholder='Warband Name' aria-label='Warband Name' aria-describedby='basic-addon2'
                            id='name' defaultValue={warband.name} onInput={updateWarband(params.id, dispatch)}/>
                    </div>
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-sm-12 col-md-10 mb-3'>
                    <div className='input-group'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Chronology</span>
                        <textarea type='text' className='form-control' placeholder='Written by a highly unreliable narrator' aria-label='Chronology' aria-describedby='basic-addon2'
                            id='chronology' defaultValue={warband.chronology} onInput={updateWarband}/>
                        
                    </div>
                </div>
            </div>

            <WarbandFaction warband={warband}
                            factions={loader.factions}
                            updateWarband={updateWarband(params.id, dispatch)} />

            <WarbandAssets  warband={warband}
                            updateWarband={updateWarband(params.id, dispatch)}

                            allEquipment={loader.equipment}
                            allFactionEquipment={loader.factionEquipment}
                            warbandEquipment={warbandEquipment}
                            createEquipment={createEquipment(warband, dispatch, updateWarband, addWarbandEquipable)} 
                            removeEquipment={removeEquipment(warband, dispatch, updateWarband, findAndRemoveWarbandEquipable)} />
        </PageLayout>
        <WarbandTroops  warband={warband}
                        allTroopTypes={loader.troopTypes} 
                        factionTroopTypes={loader.factionTroopTypes[warband.factionId]}
                        factionEquipment={loader.factionEquipment[warband.factionId]} />
        </>)
}