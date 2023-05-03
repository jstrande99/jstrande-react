import React from 'react';
import '../App.css';
import './Style/Home.css';
import pdfResume from './PDF/Jordan_Strande_2023.pdf';
import Work from './Work.js';
import Languages from './Languages.js';
import About from './About.js';
import Studies from './Studies.js';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';


export default function Home(props) { 
    let timeOfday = GetTimeOfDay();
    const handleBG = () => {
        if(props.bgColor === 'rgb(0,0,0)'){
            props.setBgColor('white');
            props.setTextColor('rgb(0,0,0)');
        }else{
            props.setBgColor('rgb(0,0,0)');
            props.setTextColor('rgb(225,225,225)');
        }
    }

    return (
        <>  
            <div className='bodies' id='Home'>
                <div className='welcomeScreen'>
                    <h2 className='timeOfDay welcomeText'>
                        Good {timeOfday},
                    </h2> 
                    <h2 className='Jordan welcomeText'>
                        I'm Jordan Strande,
                    </h2>
                    <h2 className='engineer welcomeText'>
                        Software Developer
                    </h2>
                    <button 
                        className='contactBtn' 
                        onClick={() => window.location = 'mailto:strandejordan@gmail.com'}
                    >
                        Let's Talk
                    </button>
                    <Link to='/Social' className='socialLink'>
                        <button className='contactBtn'>
                            My Social Media App
                        </button>
                    </Link>
                    <div className='icons'>
                        <a 
                            href='https://github.com/jstrande99' 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                                <FontAwesomeIcon icon={faGithub} size="2x"/>
                        </a>
                        <a 
                            href='https://www.instagram.com/jstrande/' 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                                <FontAwesomeIcon icon={faInstagram} size="2x"/>
                        </a>
                        <a 
                            href='https://www.linkedin.com/in/jordan-strande/' 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                                <FontAwesomeIcon icon={faLinkedin} size="2x"/>
                        </a>
                        <a 
                            href='mailto:strandejordan@gmail.com' 
                            rel="noopener noreferrer"
                        >
                                <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                        </a>
                        <a 
                            href={pdfResume} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                                <FontAwesomeIcon icon={faFileLines} size="2x"/>
                        </a>
                        <button 
                            onClick={() => handleBG()} 
                            className='changer '
                        > 
                                {props.bgColor === 'rgb(0,0,0)' ? 
                                    <FontAwesomeIcon icon={faSun} size="2x" fade style={{animationDuration:'4s'}}/>  : 
                                    <FontAwesomeIcon icon={faMoon} size="2x" fade style={{animationDuration:'4s'}}/>
                                } 
                        </button>
                    </div>
                </div>
            </div>
            <div className='sectionOne' id='About'>
                <div className='line2'></div>
                <div className='line1'></div>
                <h1 className='title'>
                    About Me
                </h1>
            </div>
            <div className='smallBody'>
                <About />
            </div>
            <div className='sectionOne' id='Languages'>
                <div className='line2'></div>
                <div className='line1'></div>
                <h1 className='title'>
                    Experience
                </h1>
            </div>
            <div className='smallBody'>
                <Languages />
            </div>
            <div className='sectionOne' id='Studies'>
                <div className='line2'></div>
                <div className='line1'></div>
                <h1 className='title'>
                    Academics
                </h1>
            </div>
            <div className='smallBody'>
                <Studies />
            </div>
            <div className='sectionOne' id='Work'>
                <div className='line2'></div>
                <div className='line1'></div>
                <h1 className='title'>
                    Work
                </h1>
            </div>
            <div className='smallBody'>
                <Work />
            </div>
            <div>
                <div className='line2'></div>
                <div className='line1'></div>
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