import axios from "axios";
import {
    GET_PRODUCTOS_DE_MARCA_SUCCESS,
    GET_PRODUCTOS_DE_MARCA_FAIL,
} from './types';

export const get_marca = (categoria, marca, producto) => async dispatch => { 
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/inventario/productos_de_marca_unidad/${categoria}/${marca}/${producto}/`);
        
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTOS_DE_MARCA_SUCCESS,
                payload: res.data
            });

        } else { 
            dispatch({
                type: GET_PRODUCTOS_DE_MARCA_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_PRODUCTOS_DE_MARCA_FAIL
        });
    }
}