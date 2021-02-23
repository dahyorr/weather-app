import React from 'react'
import {connect} from 'react-redux'
import {removeData} from "../actions";
import removeCircle from "../icons/removeCircle.svg";

const LeftWeatherCard = ({data, removeData}) => {
    return(
        <div className="data-boxes city-info">
            <div className="remove-icon-container">
                <img src={removeCircle} alt="" className="remove-icon" onClick={()=>removeData(data.name)}/>
            </div>
            <h2 className="text-center">{data.name}</h2>
            <div className="city-info-content">
                <p><span className="heading">Geolocation:</span> {data.coord.lon}, {data.coord.lat}</p>
                <p><span className="heading">Country:</span> {data.sys.country}</p>
                {/*<p><span class="heading"><Time></Time>:</span> {{data.timezone}}</p>*/}
            </div>
        </div>
    )
}

export default connect(null, {removeData})(LeftWeatherCard)