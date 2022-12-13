import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './NavBar.css';


export function Navbar() { 
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/#Home" className="navbar-logo" onClick={closeMobileMenu}>
                       JS <i className='fab fab-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
                        <li className='nav-item'>            
                            <Link to='/#Home' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/#Work' className='nav-links' onClick={closeMobileMenu}>
                                Work
                            </Link>
                        </li>
                        {/* <li className='nav-item'>
                            <Link to='/studies' className='nav-links' onClick={closeMobileMenu}>
                                Studies
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </>
    );
}

//Active buttons {button && <Button buttonStyle='btn--outline'>HTML/JS</Button>}