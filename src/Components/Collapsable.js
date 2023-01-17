import React from "react";
import { Collapse } from 'reactstrap';
import '../Pages/Style/Studies.css';
export function Collapsable(props) {
    return(
        <button className='innerOne' onClick={() => {props.sets(!props.shows)}}>
            <h2 className='classTitle'>{props.ttl}</h2>
            <p className='locationTitle'>{props.location}</p>
            <Collapse isOpen={props.shows}>
                <p className='descriptClass'>
                    {props.description}
                </p>
            </Collapse>
        </button>
    );
}