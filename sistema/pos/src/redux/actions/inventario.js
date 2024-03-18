import axios from "axios";
import {
    GET_INVENTARIO_SUCCESS,
    GET_INVENTARIO_FAIL,
} from './types';

export const get_inventario = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/administracion/inventario/`);
        
        if (res.status === 200) {
            dispatch({
                type: GET_INVENTARIO_SUCCESS,
                payload: res.data
            });

        } else { 
            dispatch({
                type: GET_INVENTARIO_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_INVENTARIO_FAIL
        });
    }
}
