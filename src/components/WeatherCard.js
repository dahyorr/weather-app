import React from 'react'
import LeftWeatherCard from "./LeftWeatherCard";
import RightWeatherCard from "./RightWeatherCard";

const WeatherCard = ({data}) =>{
    return(
        <div className="data-container">
            <LeftWeatherCard data={data}/>
            <RightWeatherCard data={data}/>
        </div>
    )
}
export default WeatherCard