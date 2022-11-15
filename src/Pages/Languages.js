import './Languages.css';

export default function Languages(){
    return(
        <>
            <div className="LanguagesTitle">
                <h1>Skills</h1>
                <div className='underline'></div>
            </div>
            <div className='SkillBody'>
                <div className='Javascript skill'>
                    <h3>JavaScript</h3>
                    <div className='completion'><div className='js overline'></div></div>
                </div>
                <div className='Cplus skill lefts'>
                    <h3>C++</h3>
                    <div className='completion'><div className='js overline'></div></div>
                </div>
                <div className='Java skill'>
                    <h3>Java</h3>
                    <div className='completion'><div className='js overline'></div></div>
                </div>
                <div className='C skill rights'>
                    <h3>C</h3>
                    <div className='completion'><div className='cc overline'></div></div>
                </div>
                <div className='Htmls skill'>
                    <h3>HTML</h3>
                    <div className='completion'><div className='js overline'></div></div>
                </div>
                <div className='Python skill lefts'>
                    <h3>Python</h3>
                    <div className='completion'><div className='py overline'></div></div>
                </div>
                <div className='SQL skill'>
                    <h3>SQL</h3>
                    <div className='completion'><div className='sq overline'></div></div>
                </div>
                <div className='LC skill rights'>
                    <h3>LC-3</h3>
                    <div className='completion'><div className='lc overline'></div></div>
                </div>
            </div>
        </>
    )
}