import React from 'react';
import './Style/About.css';
import HeadShot from './images/headShot.png';

export default function About(){
    return (
        <>
            <div className='aboutContainer'>
                <div className='About'>
                    <div className='paraDiv'>
                        <p className='para'> 
                            I am a Colorado State University graduate with a bachelor's degree in Applied Computer Science, 
                            focusing on Software Development. I look back on my time in school with a sense of accomplishment and pride. 
                            I have learned a wide range of technical skills, from low-level programming languages like C and assembly 
                            to high-level languages like Java, C++, and Python. <br/><br/>I have also gained a deep understanding of 
                            computer science concepts such as advanced algorithms, data structures, and software design. In addition 
                            to these technical skills, I have also developed critical skills such as problem-solving, collaboration, 
                            time management and communication. Overall, I am well-prepared to enter the workforce and make a positive 
                            impact as a software developer.
                        </p>
                    </div>
                    <div className='imgContainer'>
                        <img src={HeadShot} alt='HeadShot' className='headShot'/>
                    </div>
                </div>
            </div>
        </>
    )
}