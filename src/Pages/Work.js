import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './Style/Work.css';
// import './Style/Studies.css';
// import { Collapse } from 'reactstrap';
import { Collapsable } from '../Components/Collapsable';

export default function Work(){
    const [showSkiWork, setShowSkiWork] = useState(false);
    const [showBoatWork, setShowBoatWork] = useState(false);
    // const [showUrbanWork, setShowUrbanWork] = useState(false);
    // const [showHiwanWork, setShowHiwanWork] = useState(false);
    return (
    <>
        <div className='workLinks'>
            <div className='studyOne'>
                <Collapsable 
                    shows={showSkiWork} 
                    sets={setShowSkiWork}
                    ttl='Ski Coach'
                    location='Winter Park Ski Resort'
                    description='Coaching is a chance for Jordan to give back to the community that he was raised in. Coaching teenagers to improve techniques and sharpen their skills, all while influencing moral development. Assist with seasonal decision making that may occur. While upholding the resorts main values; Integrity, Excellence and Team.'
                />
                <Collapsable 
                    shows={showBoatWork} 
                    sets={setShowBoatWork}
                    ttl='Charter Captain'
                    location='Buckhorn Ridge Outfitters'
                    description='Provided a fun and safe boating experience for clients from around the globe. As a captain, the correct decisions must be made quickly to assure the safety of the clients. Multitasking is a skill that becomes enhanced from dealing with clients and operating a vessel. Jordan worked his way from captioning to managing and coordinating other captains in his final year of working with Buckhorn Ridge Outfitters.'
                />
            </div>
            <Popup 
                    trigger={
                        <button className='innerWork'>
                            <b className='ttl'>Track Marshall</b><br/><br/>Urban Air
                        </button>
                }
            >
                <div className='popDiv'>
                    <h2>Track Marshall / Shift Lead</h2>
                    <p className='popDescription'>
                        Assisted in the construction and grand opening activities of the Fort Collins location. Effectively managed and communicated with go-kart employees and guests. Maintained and serviced go-karts to ensure vehicles are up to quality standards. Providing a safe and fun environment for all guests.
                    </p>
                </div>
            </Popup>
            <Popup
                    trigger={
                        <button className='innerWork'>
                            <b className='ttl'>Pool Manager</b><br/><br/>Hiwan Country Club
                            </button>
                        
                }
            >
                <div className='popDiv'>
                    <h2>Pool Manager</h2>
                    <p className='popDescription'>
                        Oversaw and coordinated over 20 staff members to ensure that the facility is being ran efficiently. Working with the General Manager, and the owners to make decisions that benefit the club the best. From budgeting to organizing events for members to enjoy. Attended high level meetings among all of the managers and the owners. Preformed semi-annual trainings to ensure that the staff is up to date on all first aid techniques.
                    </p>
                </div>
            </Popup>
        </div>
    </>
    )
}