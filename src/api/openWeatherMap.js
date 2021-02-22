import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
        appid: 'a2ad70a9afeb79645fdaddfdb5af862b',
        units: 'imperial',
    }
})