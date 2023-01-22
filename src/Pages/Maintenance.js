import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Style/Maintenance.css';
import Star from './images/Star.png';
import Moon from './images/moon.png';

export default function Maintenance(){
    const Stars = () => { return (<img src={Star} className="star" alt="star" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDuration: `${Math.random()*10 + 5}s`, transform: `rotate(${Math.random() * 360}deg)` }} />)}

    return (
        <div className='cont'>
            <div className="stars-container">
                {[...Array(250)].map((e, index) => (
                    <Stars key={index} />
                ))}
            </div>
            <div className='maintenanceContainer'>
                <img src={Moon} alt="moon" className='moon'/>
                <h1 className='heading'>Page currently down for maintenance.</h1>
                <h2 className='comeBack'>There's something spectacular in the works,<br/> please check back soon</h2>
                <Link to='/Projects' className='linkage'><b className='arrow'>&#8249;</b> Back to Projects Page</Link>
            </div>
        </div>
        )
}