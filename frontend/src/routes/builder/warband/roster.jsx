
// REACT
import { useParams } from 'react-router-dom';
import TroopCard from '../../../components/_troopCard';
import PageLayout from '../../../components/_pageLayout';

// REDUX
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setWarband } from '../../../store/_warbandSlice'
import { useWarband } from '../../../store/loaders';
import FactionInsignia from '../../../components/_factionInsignia';


export default function Roster() {
    const dispatch = useDispatch()
    const params = useParams();
    const warbands = useWarband(params.id)
    const warband = warbands[params.id]
    const faction = warband ? warband.faction : undefined
    const factionTroopTypes = faction ? Object.fromEntries(
        faction.factionTroopTypes.map((factionTroopType) => [factionTroopType.troopType.id, factionTroopType]
    )) : []

    const updateWarband = (event) => {
        console.log(event)
        let updates = {}
        updates[event.target.id] = event.target.value

        axios.patch(`/api/warband/${warband.id}`, updates)
            .then((response) => {
                dispatch(setWarband(response.data))
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const renderVariants = () => {
        if (faction.variants) return(faction.variants.map((variant) => {
            return(<option value={variant.id} key={variant.id}>{variant.name}</option>)
        }))
    }

    const renderTroops = () => {
        if (warband.troops) return(warband.troops.map((troop) => {
            return(<TroopCard
                factionTroopType={factionTroopTypes[troop.troopType.id]}
                troopType={troop.troopType}
                troop={troop} 
                key={troop.id} 
            />)
        }))
    }

    const renderAddNewTroop = () => {
        return(
            <ul className='list-group list-group-horizontal row w-100 danger' id='new-troop' key='new'>
                <li className='list-group-item list-group-item-danger col-12 dropdown font-artisan'>
                    <button className='btn btn-danger dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                        New Troop
                    </button>
                    <ul className='dropdown-menu'>
                        {renderTroopTypeDropdownItems()}
                    </ul>
                </li>
            </ul>
        )
    }

    const createTroop = (factionTroopType) => {
        axios.post(`/api/warband/${warband.id}/troop`, {
            'warband':   { id: warband.id },
            'troopType': factionTroopType.troopType, 
            'name':      factionTroopType.troopType.name
        })
        .then(() => updateWarband({ target: { id: 'ducats', value: warband.ducats - factionTroopType.cost }}))
        .catch((err) => console.log(err.message))
    }

    const renderTroopTypeDropdownItems = () => {
        return Object.values(faction.factionTroopTypes).map((factionTroopType) => {
            const troopType = factionTroopType.troopType
            return(
                <li className='dropdown-item' onClick={() => createTroop(factionTroopType)} 
                    id={`faction-${troopType.id}`} key={troopType.id}>
                    {troopType.name}
                </li>
            )
        })
    }
    
    if (warband) {
        return(
            <PageLayout pageName='+ Warband Roster +'>
                <div className='row'>
                    <div className='input-group mb-3'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Warband Name</span>
                        <input type='text' className='form-control' placeholder='Warband Name' aria-label='Warband Name' aria-describedby='basic-addon2'
                            id='name' defaultValue={warband.name} onInput={updateWarband}/>
                    </div>
                </div>
    
                <div className='row'>
                    <div className='col input-group mb-3'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Faction</span>
                        <input type='text' className='form-control' placeholder='Faction' aria-label='Warband Faction' aria-describedby='basic-addon2'
                            id='name' defaultValue={warband.faction.name} disabled/>
                    </div>
                    <div className='col input-group mb-3'>
                        <span className='input-group-text font-english-towne' id='basic-addon1'>Variant</span>
                        <select className='form-select' aria-label='Variant Select'
                            id='variant' onChange={updateWarband} defaultValue={ warband.variant ? warband.variant.id : 0 }>
                            <option value='0'>-</option>
                            {renderVariants()}
                        </select>
                        <div>-</div>
                    </div>
                </div>
    
                <div className='row'>
                    <div className='col'>
                        <div className='input-group mb-3'>
                            <span className='input-group-text font-english-towne' id='basic-addon1'>Pay Chest</span>
                            <input type='number' className='form-control' placeholder='Ducats' aria-label='Ducats' aria-describedby='basic-addon2'
                                id='ducats' value={warband.ducats} onInput={updateWarband}/>
                        </div>
                    </div>
                    <div className='col'>
                        {<FactionInsignia factionId={faction.id} />}
                    </div>
                    <div className='col'>
                        <div className='input-group mb-3'>
                            <span className='input-group-text font-english-towne' id='basic-addon1'>Glory Points</span>
                            <input type='number' className='form-control' placeholder='Glory' aria-label='Glory' aria-describedby='basic-addon2'
                                id='glory' value={warband.glory} onInput={updateWarband}/>
                        </div>
                    </div>
                </div>
    
                <div className='row'>
                    <div className='col'>
                        <div className='input-group mb-3 h-100'>
                            <span className='input-group-text font-english-towne' id='basic-addon1'>Chronology</span>
                            <textarea type='text' className='form-control' placeholder='Written by a highly unreliable narrator' aria-label='Chronology' aria-describedby='basic-addon2'
                                id='chronology' defaultValue={warband.chronology} onInput={updateWarband}/>
                            
                        </div>
                    </div>
                    <div key='test' className='col'>
                        <h5 className='font-english-towne'>Armory</h5>
                        <div className=''>Standard Armor</div>
                        <div className=''>Iron Capirote</div>
                        <div className=''>Misericordia</div>
                        <div className=''>Anti-Tank Hammer</div>
                        <div className=''>Martyrdom Pills</div>
                    </div>
                </div>

                <div className='row'>
                    <h5 className='font-english-towne'>Troops</h5>
                    {renderTroops()}
                    {renderAddNewTroop()}
                </div>
            </PageLayout>
            )
        }

        return(<></>)
}