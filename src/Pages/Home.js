import React from 'react';
import '../App.css';
import './Home.css';
import worlds from './world-connected.png';
function Home() { 
    let timeOfday = GetTimeOfDay();
    
    return (
        <>
            <div className='bodies' id='Home'>
                <div className='welcomeScreen'>
                    <h2 className='timeOfDay'>Good {timeOfday},</h2> 
                    <h3 className='myName'>My name is</h3>
                    <h2 className='Jordan'>Jordan Strande</h2>
                    <h2 className='engineer'>Software Engineer / Full Stack Developer</h2>
                    {/* <p className='whoIam'>With a passion for designing, implementing and deploying advanced algorithmic applications.</p> */}
                    <img src={worlds} alt='worlds' className='homeImg'/>
                </div>
            </div>
            {/* <div id='Work' className='bodies'>
                    
            </div> */}
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