import React from 'react';
import Popup from 'reactjs-popup';
import './Style/Work.css';
import Arrow from './images/arrow.png';

export default function Work(){

    return (
    <>
        {/* <div className='workTitle'> */}
            {/* <h1 className='pastTitle'>Past Work</h1> */}
            {/* <div className='underline1'></div> */}
        {/* </div> */}
        <div className='workLinks'>
                <p className='clickEm'>Click to learn more</p>
                <img src={Arrow} alt='arrow' className='arrow'/>
            <Popup 
                contentStyle={
                    {background: "rgb(50, 50, 50)", 
                    border: "2px solid white", 
                    height:"auto",
                    width: "80vw"}} 
                    trigger={
                        <button className='innerWork'>
                            <b className='ttl'>Ski Coach</b><br/><br/>Winter Park Ski Resort
                        </button>
                    }
            >
            <div className='popDiv'>
                <h2>Freestyle Ski Coach</h2>
                <p className='popDescription'>
                    Coaching is a chance for Jordan to give back to the community that he was raised in. Coaching teenagers to improve techniques and sharpen their skills, all while influencing moral development. Assist with seasonal decision making that may occur. While upholding the resorts main values; Integrity, Excellence and Team.
                </p>
            </div>
            </Popup>
            <Popup 
                contentStyle={
                    {background: "rgb(50, 50, 50)", 
                    border: "2px solid white", 
                    height:"auto",
                    width: "80vw"}} 
                    trigger={
                        <button className='innerWork'>
                            <b className='ttl'>Boat Captain</b><br/><br/>Buckhorn Ridge Outfitters
                        </button>
                }
            >
            <div className='popDiv'>
                <h2>Charter Boat Captain</h2>
                <p className='popDescription'>
                    Provided a fun and safe boating experience for clients from around the globe. As a captain, the correct decisions must be made quickly to assure the safety of the clients. Multitasking is a skill that becomes enhanced from dealing with clients and operating a vessel. Jordan worked his way from captioning to managing and coordinating other captains in his final year of working with Buckhorn Ridge Outfitters.
                </p>
            </div>
            </Popup>
            <Popup 
                contentStyle={
                    {background: "rgb(50, 50, 50)", 
                    border: "2px solid white", 
                    height:"auto",
                    width: "80vw"}} 
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
                contentStyle={
                    {background: "rgb(50, 50, 50)", 
                    border: "2px solid white", 
                    height:"auto",
                    width: "80vw"}} 
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
            <div className='timeline'></div>
            </div>
    </>
    )
}