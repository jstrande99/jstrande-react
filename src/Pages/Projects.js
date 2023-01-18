import React from "react";
import './Style/Projects.css';
import { HashLink as Link } from 'react-router-hash-link';

export function Projects(){
    return(
        <div className="Project-body">
            <h1 className="ttl">Personal Projects</h1>
            <Link to='/Weather' className="links">Check the Weather</Link>
        </div>
    );
}