import  axios  from 'axios';

import {
    GET_PRODUCTOS_TIPO_DE_MARCA_SUCCESS,
    GET_PRODUCTOS_TIPO_DE_MARCA_FAIL,
} from './types';

export const get_marca_tipos = (categoria,marca) => async dispatch => { 
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/inventario/productos_de_marca/${categoria}/${marca}/`);
        console.log(`${process.env.REACT_APP_API_URL}/inventario/productos_de_marca/${categoria}/${marca}/`)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTOS_TIPO_DE_MARCA_SUCCESS,
                payload: res.data
            });

        } else { 
            dispatch({
                type: GET_PRODUCTOS_TIPO_DE_MARCA_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_PRODUCTOS_TIPO_DE_MARCA_FAIL
        });
    }
}