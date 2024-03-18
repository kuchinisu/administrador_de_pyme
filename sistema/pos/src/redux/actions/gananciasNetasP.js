import axios from "axios";


import {
    GET_GANANCIAS_NETAS_FAIL,
    GET_GANANCIAS_NETAS_SUCCESS,
} from './types'

export const get_ganancias_netas_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/administracion/ganancias_por_dia/`, config);
        console.log(`${process.env.REACT_APP_API_URL}/administracion/ganancias_por_dia/`)
        if (res.status === 200){
            dispatch({
                type: GET_GANANCIAS_NETAS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_GANANCIAS_NETAS_FAIL
            });
        }

    }catch (error) {
        console.error("Error fetching data:", error);
        dispatch({
            type: GET_GANANCIAS_NETAS_FAIL
        });
    }
    
}