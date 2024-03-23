import axios from "axios";


import {
    GET_EMPLEAD_ESPECIFICA_SUCCESS,
    GET_EMPLEAD_ESPECIFICA_FAIL,
} from './types'

export const get_emplead_codigo = (codigo) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/administracion/empleade/${codigo}/`, config);
        console.log(`${process.env.REACT_APP_API_URL}/administracion/empleade/${codigo}/`)
        if (res.status === 200){
            dispatch({
                type: GET_EMPLEAD_ESPECIFICA_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_EMPLEAD_ESPECIFICA_FAIL
            });
        }

    }catch (error) {
        console.error("Error fetching data:", error);
        dispatch({
            type: GET_EMPLEAD_ESPECIFICA_FAIL
        });
    }
    
}