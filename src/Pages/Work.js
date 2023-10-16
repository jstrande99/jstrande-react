import React, { useState } from 'react';
import './Style/Work.css';

export default function Work(){
    const [active, setActive] = useState(null);

    const handleToggle = (index) => {
        setActive(prevActive => prevActive === index ? null : index);
    }

    const workExperiences = [
        {
            title: 'Ski Coach',
            location: 'Winter Park Ski Resort',
            description: 'Coaching is a chance for Jordan to give back to the community that he was raised in. Coaching teenagers to improve techniques and sharpen their skills, all while influencing moral development. Assist with seasonal decision making that may occur. While upholding the resorts main values; Integrity, Excellence and Team.'
        },
        {
            title: 'Charter Captain',
            location: 'Buckhorn Ridge Outfitters',
            description: 'Provided a fun and safe boating experience for clients from around the globe. As a captain, the correct decisions must be made quickly to assure the safety of the clients. Multitasking is a skill that becomes enhanced from dealing with clients and operating a vessel. Jordan worked his way from captioning to managing and coordinating other captains in his final year of working with Buckhorn Ridge Outfitters.'
        },
        {
            title: 'Track Marshall',
            location: 'Urbain Air',
            description: 'Assisted in the construction and grand opening activities of the Fort Collins location. Effectively managed and communicated with go-kart employees and guests. Maintained and serviced go-karts to ensure vehicles are up to quality standards. Providing a safe and fun environment for all guests.'
        },
        {
            title: 'Pool Manager',
            location: 'Hiwan Country Club',
            description: 'Oversaw and coordinated over 20 staff members to ensure that the facility is being ran efficiently. Working with the General Manager, and the owners to make decisions that benefit the club the best. From budgeting to organizing events for members to enjoy. Attended high level meetings among all of the managers and the owners. Preformed semi-annual trainings to ensure that the staff is up to date on all first aid techniques.'
        },
    ];

    return (
        <>
            <div className='workLinks'>
                <div className='studyOne'>
                    {workExperiences.map((experience, index) => (
                        <div key={index} className='innerOne' onClick={() => handleToggle(index)}>
                            <h2 className='classTitle'>{experience.title}</h2>
                            <p className='locationTitle'>{experience.location}</p>
                            {active === index && (
                                <p className='descriptClass'>
                                    {experience.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
