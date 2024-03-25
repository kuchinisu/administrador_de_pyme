import axios from 'axios';
import {
    GET_SOCIOS_SUCCESS,
    GET_SOCIOS_FAIL
} from './types';

export const get_socios_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'  
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/rh/socios/`, config);
        console.log(`la solicitu va a: ${process.env.REACT_APP_API_URL}/rh/socios/`)
        if (res.status === 200){
            dispatch({
                type: GET_SOCIOS_SUCCESS,
                payload: res.data
            });
            console.log("para la caja ubo exito")
        }else{
            dispatch({
                type: GET_SOCIOS_FAIL
            });
        }

    }catch (error) {
        console.error("Error fetching data:", error);
        dispatch({
            type: GET_SOCIOS_FAIL
        });
        console.log("error en busqueda de socios")
    }
}