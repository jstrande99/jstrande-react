import React from 'react';
import './Style/About.css';
import HeadShot from './images/headShot.png';
import Computer from './images/computer.png';

export default function About(){
    return (
        <>
            <div className='aboutContainer'>
                <div className='About'>
                    <div className='paraDiv'>
                        <p className='para'> I can look back on my time in school with a sense of accomplishment and pride. I have learned a wide range of technical skills, from low-level programming languages like C and assembly to high-level languages like Java and Python. I have also gained a deep understanding of computer science concepts such as advanced algorithms, data structures, and software design. In addition to these technical skills, I have also developed important soft skills such as problem-solving, collaboration, and communication. Overall, I feel well-prepared to enter the workforce and make a positive impact as a software engineer.
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
            </div>
        </>
    )
}