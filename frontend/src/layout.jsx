// REACT
import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import NavLink from 'react-bootstrap/NavLink'

// REDUX
import { useDispatch } from 'react-redux'
import { clearWarbands } from './store/_warbandsSlice'
import { clearTroops } from './store/_troopsSlice'
import { clearEquipment } from './store/_warbandEquipmentSlice'
import axios from 'axios'



export default function Layout({children}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loggedIn = () => !!localStorage.getItem('authorization')
    
    const logout = () => {
        dispatch(clearWarbands())
        dispatch(clearTroops())
        dispatch(clearEquipment())
        localStorage.clear()
        delete axios.defaults.headers.common['Authorization']
    }

    useEffect(() => {
        const uriRequiresAuth = !['/rules/charts', '/rules/core'].includes(window.location.pathname)
        if (uriRequiresAuth && !loggedIn()) navigate('/', { replace: true })
    }, [navigate])

    const renderNavItems = () => {
        if (loggedIn()) {
            return(
                <Nav className='me-auto mb-2 mb-sm-0 font-artisan' key='nav-items'>
                    <Nav.Item className='nav-item' key='builder-nav-item'>
                        <Link className='nav-link text-light' to='/builder/warband/all'>Builder</Link>
                    </Nav.Item>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle as={NavLink} className='text-light'>
                            Rules
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item key='core-rules-nav-item'>
                                <Link className='text-dark' to='/rules/core'>Core Rules</Link>
                            </Dropdown.Item>
                            <Dropdown.Item key='charts-nav-item'>
                                <Link className='text-dark' to='/rules/charts'>Charts</Link>
                            </Dropdown.Item>
                            <Dropdown.Item key='equipment-nav-item'>
                                <Link className='text-dark' to='/rules/equipment'>Equipment</Link>
                            </Dropdown.Item>
                            <Dropdown.Item key='factions-nav-item'>
                                <Link className='text-dark' to='/rules/factions'>Factions</Link>
                            </Dropdown.Item>
                            <Dropdown.Item key='keywords-nav-item'>
                                <Link className='text-dark' to='/rules/keywords'>Keywords</Link>
                            </Dropdown.Item>
                            <Dropdown.Item key='troop-types-nav-item'>
                                <Link className='text-dark' to='/rules/troop-types'>Troop Types</Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Nav.Item className='nav-item' key='logout-nav-item'>
                        <Link className='text-light nav-link' to='/' onClick={logout}>Logout</Link>
                    </Nav.Item>
                </Nav>
            )
        }
    }

    const renderToggler = () => {
        if (loggedIn()) {
            return(
                <button className='navbar-toggler bg-light' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
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
                    <div>
                        <a className='navbar-brand' href='https://www.trenchcrusade.com/' rel='noreferrer' target='_blank'>
                            <img src='/img/trench+crusade+site+logo.png' alt='Trench Crusade Logo' height='24'/>
                        </a>
                        1.3.2
                    </div>
                    {renderToggler()}
                </div>
            </nav>
            {children}
        </main>
    )
}