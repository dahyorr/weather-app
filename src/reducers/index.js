import {combineReducers} from "redux";

const omit = require('lodash.omit')

const weatherReducer = (state={}, action) =>{
    switch(action.type){
        case 'FETCH_DATA':
            const storeData = {...state, [action.payload.response.data.name]: action.payload.response.data}
            localStorage.setItem("cities", JSON.stringify(Object.keys(storeData)))
            return storeData
        case 'REMOVE_DATA':
            const removeData = omit(state, action.payload)
            localStorage.setItem("cities", JSON.stringify(Object.keys(removeData)))
            return removeData
        default:
            return state
    }
}

const errorReducer = (state='', action) =>{
    switch(action.type){
        case 'CREATE_ERROR':
            return action.payload
        default:
            return ''
    }
}
export default combineReducers({
    weatherData: weatherReducer,
    error: errorReducer,
})