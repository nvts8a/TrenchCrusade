// @src/components/ErrorBoundary.jsx
import { Link } from 'react-router-dom'
import { clearWarbands } from '../store/_warbandsSlice'
import { clearTroops } from '../store/_troopsSlice'
import { clearEquipment } from '../store/_warbandEquipmentSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const ErrorBoundary = () => {
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(clearWarbands())
        dispatch(clearTroops())
        dispatch(clearEquipment())
        localStorage.clear()
        delete axios.defaults.headers.common['Authorization']
    }

    const style = {
        backgroundImage: `url('/img/error.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    return (
        <section className='h-100' style={style}>
            <div className='p-5'>
                <h1>What a horrible night to have a curse.</h1>
                <p>An error has occured. The best next step would be to try and <Link className='text-danger' to='/' onClick={logout}>logout</Link> and log back in.</p>
            </div>
        </section>
    )
}

export default ErrorBoundary