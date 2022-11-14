import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


export function Navbar() { 
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        {/* <img src='/images/jslogoCircle.png' alt='logo' className='logo' width='5%'/> */}
                       JS <i className='fab fab-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/work' className='nav-links' onClick={closeMobileMenu}>
                                Work
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/studies' className='nav-links' onClick={closeMobileMenu}>
                                Studies
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

//Active buttons {button && <Button buttonStyle='btn--outline'>HTML/JS</Button>}