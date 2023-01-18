import React, {useState} from "react";
import './Style/Weather.css';

export function Weather(){
    const [weatherData, setWeatherData] = useState({});

    async function getWeather(zip) {
        if(zip.length === 5 && !isNaN(zip)){
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=7c552ff3c0ccd6865ad13e3e88dd21cc&units=imperial`);
            const data = await response.json();
            setWeatherData(data);
        }
    }
    return (
        <div className="container">
            <h1 className="check">Get Your Weather</h1>
            <form className="inputZip">
                <label className="zipLabel">
                    Zip Code:
                    <input className="inputBox" type="text" onChange={e => getWeather(e.target.value)} maxLength="5" autoFocus />
                </label>
            </form>
            {weatherData.name && (
            <div className="output">
                <h2 className="locationName">{weatherData.name}'s weather</h2>
                <p>{weatherData.main.temp}&#176;</p>
                <p>{weatherData.main.humidity}% humidity</p>
                <p>{weatherData.weather[0].description}</p>
                <p>Wind Speeds: {weatherData.wind.speed} mph</p>
            </div>
            )}
        </div>
    );
}