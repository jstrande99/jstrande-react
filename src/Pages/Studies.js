import React, { useState } from 'react';
import './Style/Studies.css';
import { Collapsable } from '../Components/Collapsable';

//ALL DEFINITIONS WERE FOUND ON CSU'S COURSE CATALOG
// FOUND HERE:: https://catalog.colostate.edu/general-catalog/courses-az/
export default function Studies(){
    const [showSEDetails, setShowSEDetails] = useState(false);
    const [showWebAppDetails, setShowWebAppDetails] = useState(false);
    const [showSecDetails, setShowSecDetails] = useState(false);
    const [showOSDetails, setShowOSDetails] = useState(false);
    const [showDBDetails, setShowDBDetails] = useState(false);
    const [showAlgDetails, setShowAlgDetails] = useState(false);
    return(
        <div className='studyContainer'>
            <div className='studyOne'>
            <Collapsable 
                    shows={showSEDetails} 
                    sets={setShowSEDetails}
                    ttl='Software Engineering'
                    description='Principles, concepts, and techniques associated with team-based development of large, complex software systems. Topics include teamwork, configuration management, project management, requirements engineering, and systematic testing techniques while using GitHub. Use software tools in the context of a Scrum-based Agile development project.'
                />
            <Collapsable 
                    shows={showWebAppDetails} 
                    sets={setShowWebAppDetails}
                    ttl='Web Application Design and Development'
                    description='Advanced application design and development of modern day web applications.'
                />
            <Collapsable 
                    shows={showSecDetails} 
                    sets={setShowSecDetails}
                    ttl='Systems Security'
                    description='Computer and system security, authentication, access control, malicious software, and software security.'
                />
            <Collapsable 
                    shows={showOSDetails} 
                    sets={setShowOSDetails}
                    ttl='Operating Systems'
                    description='Advanced look into memory organization, I/O control, multitasking, process control, coordination, and resource management of operating systems.'
                />
            <Collapsable 
                    shows={showDBDetails} 
                    sets={setShowDBDetails}
                    ttl='Database Systems'
                    description='The physical and logical design, implementation, and administration of databases.'
                />
            <Collapsable 
                    shows={showAlgDetails} 
                    sets={setShowAlgDetails}
                    ttl='Algorithms (Theory and Practice)'
                    description='Analysis, design, implementation and applications of algorithms.'
                />
            </div>
        </div>
    );
}