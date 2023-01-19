import React, {useState} from "react";
import './Style/Weather.css';

export function Weather(process){
    const [weatherData, setWeatherData] = useState({});

    async function getWeather(zip) {
        if(zip.length === 5 && !isNaN(zip)){
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${process.REACT_APP_API_KEY}&units=imperial`);
            const data = await response.json();
            setWeatherData(data);
        }
    }
    // console.log(weatherData) // shows API responses
    if(weatherData.cod === "404"){
        return (
            <div className="container">
                <h1 className="check">Get Your Weather</h1>
                <form className="inputZip">
                    <label className="zipLabel">
                        Zip Code:
                        <input className="inputBox" type="text" onChange={e => getWeather(e.target.value)} maxLength="5"/>
                    </label>
                </form>
                <div className="output">
                    <h2 className="locationName">Invalid Zip Code</h2>
                </div>
            </div>
        );
    }else{
        return (
            <div className="container">
                <h1 className="check">Get Your Weather</h1>
                <form className="inputZip">
                    <label className="zipLabel">
                        Zip Code:
                        <input className="inputBox" type="text" onChange={e => getWeather(e.target.value)} maxLength="5"/>
                    </label>
                </form>
                {weatherData.name && (
                <div className="output">
                    <h2 className="locationName">{weatherData.name}'s weather</h2>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="icons" className="weatherIcon1"/>
                    <p>{weatherData.main.temp}&#176;</p>
                    <p>Feels like {weatherData.main.feels_like}&#176;</p>
                    <p>Low of {weatherData.main.temp_min}&#176; | High of {weatherData.main.temp_max}&#176;</p>
                    <p>{weatherData.main.humidity}% humidity</p>
                    <p>{weatherData.weather[0].description}</p>
                    <p>Wind is {weatherData.wind.speed} mph</p>
                </div>
                )}
            </div>
        );
    }
}