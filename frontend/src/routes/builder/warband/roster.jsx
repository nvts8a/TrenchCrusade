// REACT
import { useParams } from 'react-router-dom';
import PageLayout from '../../../components/_pageLayout';

// REDUX
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setWarband } from '../../../store/_warbandSlice'
import { useWarband } from '../../../store/loaders';
import FactionDetails from './_factionDetails';
import AssetDetails from './_assetDetails';
import TroopDetails from './_troopDetails';
import AddNewTroop from './_addNewTroop';


export default function Roster() {
    const dispatch = useDispatch()
    const params   = useParams()
    const warband  = useWarband(params.id)

    const updateWarband = (event) => {
        let updates = {}
        updates[event.target.id] = event.target.value

        axios.patch(`/api/warband/${warband.id}`, updates)
        .then((response) => dispatch(setWarband(response.data)))
        .catch((err) => console.log(err.message))
    }

    const createTroop = (factionTroopType) => () => {
        axios.post(`/api/warband/${warband.id}/troop`, {
            'warband':   { id: warband.id },
            'troopType': factionTroopType.troopType, 
            'name':      factionTroopType.troopType.name
        })
        .then(() => updateWarband({ target: { id: 'ducats', value: warband.ducats - factionTroopType.cost }}))
        .catch((err) => console.log(err.message))
    }

    const removeTroop = (troop, factionTroopType) => () => {
        axios.delete(`/api/warband/${troop.warband}/troop/${troop.id}`)
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
                                updateWarband={updateWarband} />
    
                <AssetDetails   warband={warband}
                                updateWarband={updateWarband} />

                <TroopDetails   warband={warband}
                                removeTroop={removeTroop} />

                <AddNewTroop    warband={warband}
                                createTroop={createTroop}/>
            </PageLayout>
            )
        }

        return(<></>)
}