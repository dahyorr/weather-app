import React from 'react'

const LeftWeatherCard = ({data}) => {
    return(
        <div className="data-boxes city-info">
            <h2 className="text-center">{data.name}</h2>
            <div className="city-info-content">
                <p><span className="heading">Geolocation:</span> {data.coord.lon}, {data.coord.lat}</p>
                <p><span className="heading">Country:</span> {data.sys.country}</p>
                {/*<p><span class="heading"><Time></Time>:</span> {{data.timezone}}</p>*/}
            </div>
        </div>
    )
}

export default LeftWeatherCard