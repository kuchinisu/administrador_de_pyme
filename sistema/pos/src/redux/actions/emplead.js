import axios from "axios";


import {
    GET_EMPLEAD_SUCCESS,
    GET_EMPLEAD_FAIL,
} from './types'

export const get_emplead_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/rh/empleades/`, config);
        console.log(`${process.env.REACT_APP_API_URL}/rh/empleades/`)
        if (res.status === 200){
            dispatch({
                type: GET_EMPLEAD_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_EMPLEAD_FAIL
            });
        }

    }catch (error) {
        console.error("Error fetching data:", error);
        dispatch({
            type: GET_EMPLEAD_FAIL
        });
    }
    
}