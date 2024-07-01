import AddNewEquipment from './_addNewEquipment'
import { useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { createWarbandEquipable, removeWarbandEquipable } from '../../../store/_warbandEquipmentActions'
import { updateWarband } from '../../../store/_warbandsActions'

export default function WarbandAssets({warband, warbandEquipment}) {
    const dispatch = useDispatch()
    const loader = useLoaderData()
    
    return(
        <>
            <div className='row justify-content-center'>
                <div className='col-sm-12 col-md-4 mb-3'>
                    <div className='input-group'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Pay Chest</span>
                        <input type='number' className='form-control' placeholder='Ducats' aria-label='Ducats' aria-describedby='basic-addon2'
                            id='ducats' value={warband.ducats} onInput={(event) => dispatch(updateWarband(warband, event))}/>
                    </div>
                </div>

                <div className='col-sm-12 col-md-4 mb-3'>
                    <div className='input-group'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Glory Points</span>
                        <input type='number' className='form-control' placeholder='Glory' aria-label='Glory' aria-describedby='basic-addon2'
                            id='glory' value={warband.glory} onInput={(event) => dispatch(updateWarband(warband, event))}/>
                    </div>
                </div>
            </div>

            <AddNewEquipment
                currentEquipment={warbandEquipment.values[warband.id]}
                availableEquipment={loader.factionEquipment[warband.factionId]} 
                createEquipment={createWarbandEquipable(warband)}
                removeEquipment={removeWarbandEquipable(warband)} />
        </>
    )
}