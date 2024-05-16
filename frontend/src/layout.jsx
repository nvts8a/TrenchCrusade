import React from 'react';
import { Link } from 'react-router-dom';

const Layout =({children}) => {
    return (
        <main>
            <nav className='navbar navbar-expand-lg bg-dark border-bottom border-body'>
                <div className='container-fluid '>
                    <img className='p-1' src='/favicon.ico' alt='Trench Crusade Logo' height='36'/>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0' key='nav-items'>
                            <li className='nav-item' key='builder-nav-item'>
                                <Link className='text-light nav-link font-artisan' to='/builder/warband/all'>Builder</Link>
                            </li>
                            <li className='nav-item dropdown'>
                                <div className='text-light nav-link dropdown-toggle font-artisan' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Rules
                                </div>
                                <ul className='dropdown-menu'>
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
                        </ul>
                    </div>
                    <a className='navbar-brand' href='https://www.trenchcrusade.com/' rel='noreferrer' target='_blank'>
                        <img src='/img/trench+crusade+site+logo.png' alt='Trench Crusade Logo' height='24'/>
                    </a>
                </div>
            </nav>
            {children}
        </main>
    )
}

export default Layout;
