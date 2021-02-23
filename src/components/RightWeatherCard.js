import React from 'react'
import {connect} from 'react-redux'
import {removeData} from "../actions";
import removeCircle from "../icons/removeCircle.svg";

const fToC = f => {
    return (f-32) * (5/9)
}

const roundUp = x => {
    return Math.round(x)
}

const RightWeatherCard = ({data, removeData}) => {
    return(
        <div className="data-boxes weather-info flex-box">

            <div className="remove-icon-container">
                <img src={removeCircle} alt="" className="remove-icon" onClick={()=>removeData(data.name)}/>
            </div>

            <div className="weather-icon">
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt=""
                     />
            </div>

            <div className="weather-info-content ">
                <h2 className="text-center weather-info-content-title">Weather</h2>

                <div className="grid-box">

                    <div>
                        <p><span className="heading">Temperature<span className="colon">:</span> </span>
                            {roundUp(fToC(data.main.temp))}&#730;C</p>
                        <p><span className="heading">Feels Like<span className="colon">:</span> </span>
                            {roundUp(fToC(data.main.feels_like))}&#730;C</p>
                        <p><span className="heading">Condition<span className="colon">:</span></span> {data.weather[0].description}</p>
                    </div>

                    <div>
                        <p><span className="heading">Humidity<span className="colon">:</span></span> {data.main.humidity}%</p>
                        <p><span className="heading">Pressure<span className="colon">:</span></span> {data.main.pressure}hPa</p>
                        <p><span className="heading">Wind<span className="colon">:</span></span> {roundUp(data.wind.speed/2.237)}m/s</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default connect(null, {removeData})(RightWeatherCard)