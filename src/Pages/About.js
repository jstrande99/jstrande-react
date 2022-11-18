import React from 'react';
import './Style/About.css';
import HeadShot from './images/headShot.png';
import Computer from './images/computer.png';

export default function About(){
    return (
        <>
            <div className='About'>
                <div className='paraDiv'>
                    <p className='para'>  I am a soon to be graduate from Colorado State University with a focus in software engineer / full stack developer. I will graduating with a Bachelor's degree in Natural Sciences, majoring in Applied Computer Science.
                        <br/><br/>I have always had a strong passion for design and structure of algorithms, I am always looking for ways to expand and perfect pre-existing programs. 
                    </p>
                </div>
                <div className='imgContainer'>
                    <img src={HeadShot} alt='HeadShot' className='headShot'/>
                </div>
            </div>
            <div className='quote'>
                <div className='quoteContainer'>
                    <img src={Computer} alt='Computer' className='Computer'/>
                    <p className='quotes'>"Everything is designed. Few things are designed well." <br/>~Brian Reed</p>
                </div>
            </div>
        </>
    )
}