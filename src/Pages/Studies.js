import React, { useState } from 'react';
import './Style/Studies.css';
import { Collapse } from 'reactstrap';
// import { Collapsable } from '../Components/Collapsable';

//ALL DEFINITIONS WERE FOUND ON CSU'S COURSE CATALOG
// FOUND HERE:: https://catalog.colostate.edu/general-catalog/courses-az/
export default function Studies(){
    const [showDetails, setShowDetails] = useState(false);
    return(
        <div className='studyContainer'>
            <div className='studyOne'>
                <button className=' innerOne'  onClick={() => { setShowDetails(!showDetails) }}>
                    <h2 className='classTitle'>Software Engineering</h2>
                    <Collapse isOpen={showDetails}>
                        <p className='descriptClass'>Principles, concepts, and techniques associated with team-based development of large, complex software systems. Topics include teamwork, configuration management, project management, requirements engineering, and systematic testing techniques while using GitHub. Use software tools in the context of a Scrum-based Agile development project.</p>
                    </Collapse>
                </button> 
                <button className=' innerOne'  onClick={() => { setShowDetails(!showDetails) }}>
                    <h2 className='classTitle'>Web Application Design and Development</h2>
                    <Collapse isOpen={showDetails}>
                        <p className='descriptClass'>Advanced application design and development of modern day web applications.</p>
                    </Collapse>
                </button>
                <button className=' innerOne'  onClick={() => { setShowDetails(!showDetails) }}>
                    <h2 className='classTitle'>Systems Security</h2>
                    <Collapse isOpen={showDetails}>
                        <p className='descriptClass'>Computer and system security, authentication, access control, malicious software, and software security.</p>
                    </Collapse>
                </button>
               
                <button className=' innerOne'  onClick={() => { setShowDetails(!showDetails) }}>
                    <h2 className='classTitle'>Operating Systems</h2>
                    <Collapse isOpen={showDetails}>
                        <p className='descriptClass'>Advanced look into memory organization, I/O control, multitasking, process control, coordination, and resource management of operating systems</p>
                    </Collapse>
                </button>
                <button className=' innerOne'  onClick={() => { setShowDetails(!showDetails) }}>
                    <h2 className='classTitle'>Database Systems</h2>
                    <Collapse isOpen={showDetails}>
                        <p className='descriptClass'>The physical and logical design, implementation, and administration of databases.</p>
                    </Collapse>
                </button>
                <button className=' innerOne'  onClick={() => { setShowDetails(!showDetails) }}>
                    <h2 className='classTitle'>Algorithms (Theory and Practice)</h2>
                    <Collapse isOpen={showDetails}>
                        <p className='descriptClass'>Analysis, design, implementation and applications of algorithms.</p>
                    </Collapse>
                </button>
            </div>
        </div>
    );
}