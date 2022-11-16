import React from 'react';
import './Style/About.css';
import HeadShot from './images/headShot.png';

export default function About(){
    return (
        <>
            <div className='About'>
                <div className='paraDiv'>
                    <p className='para'>  Jordan was born in Denver, Colorado. He started is in his last semester at Colorado State University. Jordan will be graduating with a Bachelor's degree in Natural Sciences, majoring in Applied Computer Science.
                        <br/><br/>Jordan grew up skiing competitively on the Winter Park ski team, and represented the United States in Junior Worlds held in Italy. He now hopes to give back to the community that made him the person he is today, by coaching the team that he was once a part of.
                        <br/><br/>Jordan developed a love for computers when he was a junior in high school, and since then has expanded greatly on his skills and improved upon his software engineering
                    </p>
                </div>
                <div className='imgContainer'>
                    <img src={HeadShot} alt='HeadShot' className='headShot'/>
                </div>
            </div>
        </>
    )
}