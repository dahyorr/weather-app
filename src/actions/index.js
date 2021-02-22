import openWeatherMap from "../api/openWeatherMap";

export const createError = message =>{
    return{
        type: 'CREATE_ERROR',
        payload: message
    }
}

export const removeData = name =>{
    return{
        type: 'REMOVE_DATA',
        payload: name
    }
}

export const fetchData = city => async dispatch => {
    let r ;
    try {
        r = await openWeatherMap.get('', {
            params: {
                q: city
            }
        })
        dispatch({
            type: 'FETCH_DATA',
            payload: {
                response: r,
            }
        })
    }catch (e) {
        if (e.message === 'Network Error'){
            dispatch(createError('Check your Network connection'))
        }
        else if (e.response) {
            if (e.response.status === 404) {
                dispatch(createError('City could not be found'))
            } else {
                dispatch(createError('An error occurred, Please try again later'))
            }
        }
        else{
            console.log(e.message)
        }
    }
}



