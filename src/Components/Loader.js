import React, { useEffect, useState } from 'react';
import './Loader.css';
import Floating from '../Pages/images/floatin1.png';

export function Loader(){
    const [Loading, setLoading] = useState("false");
    useEffect(() => {
        setLoading("true")
        setTimeout(() => {
        setLoading("false");
        }, 1100);
    }, [setLoading]); 


    return(
        <div className={`fullscreen-${Loading}`}>
            <div className='innerSpin'>
                <h1 className='loadwords'>WELCOME</h1>
                <img src={Floating} alt='Astronat' className='loadImg'/>
            </div>
        </div>
    )
}