import React, { useState } from 'react';
import './Style/Studies.css';

export default function Studies(){
    const [active, setActive] = useState(null);

    const handleToggle = (index) => {
        setActive(prevActive => prevActive === index ? null : index);
    }

    const studies = [
        {
            title: 'Software Engineering',
            description: 'Principles, concepts, and techniques associated with team-based development of large, complex software systems. Topics include teamwork, configuration management, project management, requirements engineering, and systematic testing techniques while using GitHub. Use software tools in the context of a Scrum-based Agile development project.'
        },
        {
            title: 'Web Application Design and Development',
            description: 'Advanced application design and development of modern day web applications.'
        },
        {
            title: 'Systems Security',
            description: 'Computer and system security, authentication, access control, malicious software, and software security.'
        },
        {
            title: 'Operating Systems',
            description: 'Advanced look into memory organization, I/O control, multitasking, process control, coordination, and resource management of operating systems.'
        },
        {
            title: 'Database Systems',
            description: 'The physical and logical design, implementation, and administration of databases.'
        },
        {
            title: 'Algorithms (Theory and Practice)',
            description: 'Analysis, design, implementation and applications of algorithms.'
        }
    ];

    return (
        <div className='studyContainer'>
            <div className='studyOne'>
                {studies.map((study, index) => (
                    <div key={index} className='innerOne' onClick={() => handleToggle(index)}>
                        <h2 className='classTitle'>{study.title}</h2>
                        {active === index && (
                            <p className='descriptClass'>
                                {study.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}