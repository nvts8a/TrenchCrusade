
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

    const updateWarband = (event) => {
        axios.patch(`/api/warband/${params.id}`, { [event.target.id]: event.target.value })
            .then((response) => {
                dispatch(setWarband(response.data))
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const renderTroops = () => {
        if (warband.troops) return warband.troops.map((troop) => {
            return(<TroopCard troop={troop} key={troop.id} />)
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
                    <div className='col'>
                        <h5 className='font-english-towne'>Faction</h5>
                        <div>{warband.faction.name}</div>
                    </div>
                    <div className='col'>
                        <h5 className='font-english-towne'>Variant</h5>
                        <div>-</div>
                    </div>
                </div>
    
                <div className='row'>
                    <div className='col'>
                        <div className='input-group mb-3'>
                            <span className='input-group-text font-english-towne' id='basic-addon1'>Pay Chest</span>
                            <input type='number' className='form-control' placeholder='Ducats' aria-label='Ducats' aria-describedby='basic-addon2'
                                id='ducats' defaultValue={warband.ducats} onInput={updateWarband}/>
                        </div>
                    </div>
                    <div className='col'>
                        {<FactionInsignia factionId={warband.faction.id} />}
                    </div>
                    <div className='col'>
                        <div className='input-group mb-3'>
                            <span className='input-group-text font-english-towne' id='basic-addon1'>Glory Points</span>
                            <input type='number' className='form-control' placeholder='Glory' aria-label='Glory' aria-describedby='basic-addon2'
                                id='glory' defaultValue={warband.glory} onInput={updateWarband}/>
                        </div>
                    </div>
                </div>
    
                <div className='row'>
                    <div className='col'>
                        <div className='input-group mb-3 h-100'>
                            <span className='input-group-text font-english-towne' id='basic-addon1'>Chronology*</span>
                            <textarea type='text' className='form-control' placeholder='Chronology' aria-label='Chronology' aria-describedby='basic-addon2'
                                id='chronology' defaultValue={warband.chronology} onInput={updateWarband}/>
                            
                        </div>
                        <p className='row font-english-towne'>*Written by a highly unreliable narrator</p>
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
                </div>
            </PageLayout>
            )
        }

        return(<></>)
}