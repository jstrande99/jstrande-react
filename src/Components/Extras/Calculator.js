import React, { useState } from 'react';
import './Calculator.css'; 

export default function Calculator(){
    const [runningEquation, setRunningEquation] = useState(""); 
    const [individualNum, setIndividualNum] = useState(""); //Is actually the total equation 
    const [values, setValues] = useState([]);
    const [total, setTotal] = useState(0);
    const context = {runningEquation, setRunningEquation, total, setTotal, values, setValues,individualNum, setIndividualNum};
    return (
        <>
            <div className='calcContainer'> 
                <div className='calcInnerContainer'>
                    <div className='calcInput'>
                        {getRunningEquation(context)}
                    </div>
                    <div className='calcButtons'>
                        <button className='one btn' onClick={() => {getNumber(1,0,context)}}>1</button>
                        <button className='two btn' onClick={() => {getNumber(2,0,context)}}>2</button>
                        <button className='three btn' onClick={() => {getNumber(3,0,context)}}>3</button>
                        <button className='divid btn' onClick={() => {getNumber('/',1,context)}}>/</button>
                        <button className='four btn' onClick={() => {getNumber(4,0,context)}}>4</button>
                        <button className='five btn' onClick={() => {getNumber(5,0,context)}}>5</button>
                        <button className='six btn' onClick={() => {getNumber(6,0,context)}}>6</button>
                        <button className='multiply btn' onClick={() => {getNumber('x',1,context)}}>x</button>
                        <button className='seven btn' onClick={() => {getNumber(7,0,context)}}>7</button>
                        <button className='eight btn' onClick={() => {getNumber(8,0,context)}}>8</button>
                        <button className='nine btn' onClick={() => {getNumber(9,0,context)}}>9</button>
                        <button className='add btn' onClick={() => {getNumber('+',1,context)}}>+</button>
                        <button className='zero btn' onClick={() => {getNumber(0,0,context)}}>0</button>
                        <button className='decimal btn' onClick={() => {getNumber('.',1,context)}}>.</button>
                        <button className='equals btn' onClick={() => {getNumber('=',1,context)}}>=</button>
                        <button className='subtract btn' onClick={() => {getNumber('-',1,context)}}>-</button>
                        <button className='clear btn' onClick={() => {getNumber('ac',1,context)}}>AC</button>
                        <button className='negality btn' onClick={() => {getNumber('pn',1,context)}}>+/-</button>
                    </div>
                </div>
            </div>
        </>
    )
}

function getRunningEquation(context){
    return context.individualNum;
}

function getNumber(num, offSet, context){
    if(num === 'ac'){
        context.setIndividualNum("");
        context.setRunningEquation("");
    }else{
        let holder = context.runningEquation;
        let strHolder = context.individualNum + num;
        if(offSet === 1){
            context.values.push(holder);
            context.values.push(num);
            context.setRunningEquation([]);
        }else{
            holder += num.toString();
            context.setRunningEquation(holder);
        }
        context.setIndividualNum(strHolder);
    } 
    console.log()
}