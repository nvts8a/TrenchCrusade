import React from 'react';
import { Link } from 'react-router-dom';

const Layout =({children}) => {
    return (
        <main>
            <nav className='navbar navbar-expand-lg text-secondary'>
                <div className='container-fluid '>
                    <a className='navbar-brand' href='https://www.trenchcrusade.com/' rel='noreferrer' target='_blank'>
                        <img src='/img/trench+crusade+site+logo.png' alt='Trench Crusade Logo' height='24'/>
                    </a>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0' key='nav-items'>
                            <li className='nav-item' key='keywords-nav-item'>
                                <Link className='nav-link' to='/keywords'>Keywords</Link>
                            </li>
                            <li className='nav-item' key='builder-nav-item'>
                                <Link className='nav-link' to='/builder/warband/all'>Builder</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                {children}
            </div>
        </main>

    )
}

export default Layout;
