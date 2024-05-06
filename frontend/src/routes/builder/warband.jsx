// REACT
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// REDUX
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addWarband, deleteWarband, setWarbands } from './warbandSlice'
import { addRoster, deleteRoster } from './warband/rosterSlice';


export default function Warband() {
    const warbands = useSelector(state => state.warbands.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (warbands.length === 0) {
            axios('/api/warband/all')
              .then((response) => {
                dispatch(setWarbands(response.data))
              })
              .catch((err) => {
                console.log(err.message)
              })
          }
    }, [dispatch, warbands])

    const createWarband = () => {
        axios.post('/api/warband', { "faction": { "id": 1 }, "name": "New Warband", "login": { "id": 1 } })
            .then((response) => {
            dispatch(addWarband(response.data))
            dispatch(addRoster({
                warbandId: response.data.id, 
                troops: []
            }))
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const removeWarband = (warbandId) => {
        axios.delete(`/api/warband/${warbandId}`)
            .then((response) => {
            dispatch(deleteWarband(response.data))
            dispatch(deleteRoster(response.data))
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const renderWarbands = () => {
        return warbands.map((warband) => {
            return(
                <div className="row align-items-end" id={`warband-${warband.id}`} key={warband.id}>
                    <div>
                        <Link to={`/builder/warband/${warband.id}/roster`}>{warband.name}</Link>
                        <div className="icon-link icon-link-hover" onClick={() => removeWarband(warband.id)}><i className="bi bi-trash-fill"></i></div>
                    </div>
                </div>
            );
        })
    }

    return(
        <div className='container text-center'>
            {renderWarbands()}
            <button aria-label="Increment value" onClick={() => createWarband()}>
                New Warband
            </button>
        </div>
    )
}