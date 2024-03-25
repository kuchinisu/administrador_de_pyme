import axios from "axios";
import {
    GET_CATEGORIAS_SUCCESS,
    GET_CATEGORIAS_FAIL
} from './types';

export const get_categorias = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'applications/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/inventario/categorias/`, config);
        
        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIAS_SUCCESS,
                payload: res.data
            });

        }else{
            dispatch({
                type:GET_CATEGORIAS_FAIL
            })
        }

    } catch (err){
        dispatch({
            type:GET_CATEGORIAS_FAIL
        })
    }
}