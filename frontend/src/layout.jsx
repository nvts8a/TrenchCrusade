import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { deleteWarbands } from './store/_warbandSlice'

const Layout =({children}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const uriRequiresAuth = !['/rules/charts', '/rules/core'].includes(window.location.pathname)
    const loggedIn = () => !!localStorage.getItem('authorization')
    
    const logout = () => {
        dispatch(deleteWarbands())
        localStorage.removeItem('authorization')
        delete axios.defaults.headers.common['Authorization']

    }

    useEffect(() => {
        if (uriRequiresAuth && !loggedIn()) navigate('/', { replace: true })
    }, [navigate])

    const renderNavItems = () => {
        if (loggedIn()) {
            return(
                <ul className='navbar-nav me-auto mb-2 mb-lg-0' key='nav-items'>
                    <li className='nav-item' key='builder-nav-item'>
                        <Link className='text-light nav-link font-artisan' to='/builder/warband/all'>Builder</Link>
                    </li>
                    <li className='nav-item dropdown'>
                        <div className='text-light nav-link dropdown-toggle font-artisan' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            Rules
                        </div>
                        <ul className='dropdown-menu'>
                            <li className='nav-item' key='core-rules-nav-item'>
                                <Link className='text-dark nav-link font-artisan' to='/rules/core'>Core Rules</Link>
                            </li>
                            <li className='nav-item' key='charts-nav-item'>
                                <Link className='text-dark nav-link font-artisan' to='/rules/charts'>Charts</Link>
                            </li>
                            <li className='nav-item' key='equipment-nav-item'>
                                <Link className='text-dark nav-link font-artisan' to='/rules/equipment'>Equipment</Link>
                            </li>
                            <li className='nav-item' key='factions-nav-item'>
                                <Link className='text-dark nav-link font-artisan' to='/rules/factions'>Factions</Link>
                            </li>
                            <li className='nav-item' key='keywords-nav-item'>
                                <Link className='text-dark nav-link font-artisan' to='/rules/keywords'>Keywords</Link>
                            </li>
                            <li className='nav-item' key='troop-types-nav-item'>
                                <Link className='text-dark nav-link font-artisan' to='/rules/troop-types'>Troop Types</Link>
                            </li>
                        </ul>
                    </li>
                    <li className='nav-item' key='logout-nav-item'>
                        <Link className='text-light nav-link font-artisan' to='/' onClick={logout} >Logout</Link>
                    </li>
                </ul>
            )
        }
    }

    return (
        <main className='h-100'>
            <nav className='navbar navbar-expand-sm bg-dark border-bottom border-body'>
                <div className='container-fluid'>
                    <Link to='/'><img className='p-1' src='/favicon.ico' alt='Trench Crusade Logo' height='36'/></Link>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        {renderNavItems()}
                    </div>
                    <a className='navbar-brand' href='https://www.trenchcrusade.com/' rel='noreferrer' target='_blank'>
                        <img src='/img/trench+crusade+site+logo.png' alt='Trench Crusade Logo' height='24'/>
                    </a>
                    <button className='navbar-toggler bg-light' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                </div>
            </nav>
            {children}
        </main>
    )
}

export default Layout;
