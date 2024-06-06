// REACT
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../../components/_pageLayout';

// REDUX
import { useDispatch } from 'react-redux'
import { useFactions, useWarbands } from '../../store/loaders';
import { createWarband, removeWarband } from './_builderActions';

export default function Warband() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const factions = useFactions()
    const warbands = useWarbands()

    const renderWarbands = () => {
        return Object.values(warbands).map((warband) => {
            return(
                <div className='row justify-content-center' key={warband.id}>
                    <div className='col-sm-12 col-md-3'>
                        <ul className='list-group list-group-horizontal row w-100' id={`warband-${warband.id}`}>
                            <li className='list-group-item col-10'>
                                <Link className='font-artisan' to={`/builder/warband/${warband.id}/roster`}>{warband.name}</Link>
                            </li>
                            <li className='list-group-item col-2'>
                                <div className='icon-link icon-link-hover' onClick={removeWarband(warband.id, dispatch)}>
                                    <i className='bi bi-trash-fill'></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        })
    }

    const renderAddNewWarband = () => {
        return(

            <div className='btn-group dropup font-artisan m-3' id='new-warband'>
                <button className='btn btn-danger dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    New Warband
                </button>
                <ul className='dropdown-menu'>
                    {renderFactionDropdownItems()}
                </ul>
            </div>
        )
    }

    const renderFactionDropdownItems = () => {
        return Object.values(factions).map((faction) => {
            return(
                <li className='dropdown-item' id={`faction-${faction.id}`} key={faction.id} onClick={createWarband(faction, dispatch, navigate)}>{faction.name}</li>
            );
        })
    }

    return(
        <PageLayout pageName='Warbands'>
            {renderWarbands()}
            {renderAddNewWarband()}
        </PageLayout>
    )
}