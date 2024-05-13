// REACT
import { Link } from 'react-router-dom';
import PageLayout from '../../components/_pageLayout';

// REDUX
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { deleteWarband, setWarband } from '../../store/_warbandSlice'
import { useFactions, useWarbands } from '../../store/loaders';

export default function Warband() {
    const dispatch = useDispatch()
    const factions = useFactions()
    const warbands = useWarbands()

    const createWarband = (factionId) => {
        axios.post('/api/warband', { 
            'faction':  { 'id': factionId }, 
            'name':     factions[factionId].name,
            'login':    { 'id': 1 } 
        })
        .then((response) => dispatch(setWarband(response.data)))
        .catch((err)     => console.log(err.message))
    }

    const removeWarband = (warbandId) => {
        axios.delete(`/api/warband/${warbandId}`)
        .then((response) => dispatch(deleteWarband(response.data)))
        .catch((err)     => console.log(err.message))
    }

    const renderWarbands = () => {
        return Object.values(warbands).map((warband) => {
            return(
                <ul className='list-group list-group-horizontal row w-100' id={`warband-${warband.id}`} key={warband.id}>
                    <li className='list-group-item col-10'><Link className='font-artisan' to={`/builder/warband/${warband.id}/roster`}>{warband.name}</Link></li>
                    <li className='list-group-item col-2'><div className='icon-link icon-link-hover' onClick={() => removeWarband(warband.id)}><i className='bi bi-trash-fill'></i></div></li>
                </ul>
            );
        })
    }

    const renderAddNewWarband = () => {
        return(
            <ul className='list-group list-group-horizontal row w-100 danger' id='new-warband' key='new'>
                <li className='list-group-item list-group-item-danger col-12 dropdown font-artisan'>
                    <button className='btn btn-danger dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                        New Warband
                    </button>
                    <ul className='dropdown-menu'>
                        {renderFactionDropdownItems()}
                    </ul>
                </li>
            </ul>
        )
    }

    const renderFactionDropdownItems = () => {
        return Object.values(factions).map((faction) => {
            return(
                <li className='dropdown-item' id={`faction-${faction.id}`} key={faction.id} onClick={() => createWarband(faction.id)}>{faction.name}</li>
            );
        })
    }

    return(
        <PageLayout pageName='+ Warbands +'>
            <div className='row'>
                <div className='col-4'/>
                <div className='col-4'>
                    {renderWarbands()}
                    {renderAddNewWarband()}
                </div>
                <div className='col-4'/>
            </div>
        </PageLayout>
    )
}