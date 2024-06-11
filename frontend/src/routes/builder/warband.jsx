// REACT
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import ListGroup from 'react-bootstrap/ListGroup'
import PageLayout from '../../components/_pageLayout'

// REDUX
import { useDispatch } from 'react-redux'
import { useFactions, useWarbands } from '../../store/loaders'
import { createWarband, removeWarband } from './_builderActions'

export default function Warband() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const factions = useFactions()
    const warbands = useWarbands()

    const renderWarbands = () => {
        return Object.values(warbands).map((warband) => {
            return(
                <div className='row justify-content-center' key={warband.id}>
                    <div className='col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4' >
                        <ListGroup horizontal id={`warband-${warband.id}`}>
                            <ListGroup.Item className='col-10'>
                                <Link className='font-artisan' to={`/builder/warband/${warband.id}/roster`}>{warband.name}</Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='col-2'>
                                <div className='icon-link icon-link-hover' onClick={removeWarband(warband.id, dispatch)}>
                                    <i className='bi bi-trash-fill'></i>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            )
        })
    }

    const renderAddNewWarband = () => {
        return(
            <Dropdown drop='down-centered' className='font-artisan m-3' id='new-warband'>
                <Dropdown.Toggle variant='danger'>
                    New Warband
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {renderFactionDropdownItems()}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    const renderFactionDropdownItems = () => {
        return Object.values(factions).map((faction) => {
            return(
                <Dropdown.Item id={`faction-${faction.id}`} key={faction.id} onClick={createWarband(faction, dispatch, navigate)}>
                    {faction.name}
                </Dropdown.Item>
            )
        })
    }

    return(
        <PageLayout pageName='Warbands'>
            <div className='container' style={{minHeight: '150px'}}>
                {renderWarbands()}
            </div>
            {renderAddNewWarband()}
        </PageLayout>
    )
}