import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './NavBar.css';

export function Navbar() { 
    const [click, setClick] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [screenSize, setScreenSize] = useState(window.innerWidth)

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    function handleDropdown(){
        setClick(false);
        setDropdownOpen(!dropdownOpen); 
    }

    useEffect(() => {
        function handleScreenSize(){
            setScreenSize(window.innerWidth);
        }
        window.addEventListener('resize', handleScreenSize);
        return () => window.removeEventListener('resize', handleScreenSize);
    }, []);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
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
                            <Link to='/#About' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/#Languages' className='nav-links' onClick={closeMobileMenu}>
                                Experience
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/#Studies' className='nav-links' onClick={closeMobileMenu}>
                                Studies
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/#Work' className='nav-links' onClick={closeMobileMenu}>
                                Work
                            </Link>
                        </li>
                        <li className='nav-item'>
                            {screenSize > 960 ? (
                                <>
                                    <p onClick={() => setDropdownOpen(!dropdownOpen)} className="nav-links">
                                        Projects
                                    </p>
                                    {dropdownOpen && (
                                        <ul>
                                            <li className='dropdownOption'>
                                                <Link to='/Social' onClick={handleDropdown} className="nav-links">
                                                    My Social Media App
                                                </Link>
                                            </li>
                                            <li className='dropdownOption'>
                                                <Link to='/Weather' onClick={handleDropdown} className="nav-links">
                                                    My Weather App
                                                </Link>
                                            </li>
                                            <li className='dropdownOption'>
                                                <Link to='/Cookbook' onClick={handleDropdown} className="nav-links">
                                                    My Cookbook App
                                                </Link>
                                            </li>
                                            <li className='dropdownOption'>
                                                <Link to='/Maintenance' onClick={handleDropdown} className="nav-links">
                                                    Check the News
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link to='/Projects' className='nav-links' onClick={closeMobileMenu}>
                                    Projects
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

//Active buttons {button && <Button buttonStyle='btn--outline'>HTML/JS</Button>}