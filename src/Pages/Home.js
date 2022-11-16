import React from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import './Style/Home.css';
import worlds from './images/world-connected.png';
import Github from './images/GitHub.png';
import Insta from './images/instagram.png';
import LinkedIn from './images/linkedin.png';
// import Popup from 'reactjs-popup';
import Work from './Work.js';
import Languages from './Languages.js';
import About from './About.js';
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
                    <div className='icons'>
                        <a href='https://github.com/jstrande99' target="_blank" rel="noopener noreferrer"><img src={Github} alt='Github' className='iconLink gt'/></a>
                        <a href='https://www.instagram.com/jstrande/' target="_blank" rel="noopener noreferrer"><img src={Insta} alt='Instagram' className='iconLink ins'/></a>
                        <a href='https://www.linkedin.com/in/jordan-strande/' target="_blank" rel="noopener noreferrer"><img src={LinkedIn} alt='LinkedIn' className='iconLink lnk'/></a>
                    </div>
                </div>
            </div>
            <div className='line2'></div>
            <div className='line1'></div>
            <h1 className='title'>About Me</h1>
            <div id='Languages' className='smallBody'>
                <About />
            </div>
            <div className='line2'></div>
            <div className='line1'></div>
            <h1 className='title'>Expirience</h1>
            <div id='Languages' className='smallBody'>
                <Languages />
            </div>
            <div className='line2'></div>
            <div className='line1'></div>
            <h1 className='title'>Work</h1>
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