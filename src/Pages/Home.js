import React from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import './Style/Home.css';
import worlds from './images/world-connected.png';
// import Popup from 'reactjs-popup';
import Work from './Work.js';
import Languages from './Languages.js';
function Home() { 
    let timeOfday = GetTimeOfDay();
    
    return (
        <>
            <div className='bodies' id='Home'>
                <div className='welcomeScreen'>
                    <h2 className='timeOfDay welcomeText'>Good {timeOfday},</h2> 
                    <h3 className='myName welcomeText'>My name is</h3>
                    <h2 className='Jordan welcomeText'>Jordan Strande</h2>
                    <h2 className='engineer welcomeText'>Software Engineer / Full Stack Developer</h2>
                    <img src={worlds} alt='worlds' className='homeImg'/>
                </div>
            </div>
            <div id='Languages' className='smallBody'>
                <Languages />
            </div>
            <div id='Work' className='bodies'>
                <Work />
            </div>
        </>
    )
}

function GetTimeOfDay(){
    var date = new Date();
    var currentTime = date.getHours(); 
    let timeQuote = "";
    if(currentTime < 12 && currentTime >=6){
        timeQuote = "Morning"
    }else if( currentTime >= 12 && currentTime < 18){
        timeQuote = "Afternoon"
    }else if(currentTime >= 18 && currentTime < 24){
        timeQuote = "Evening"
    }else{
        timeQuote = "Night"
    }
    return timeQuote; 
}
export default Home;