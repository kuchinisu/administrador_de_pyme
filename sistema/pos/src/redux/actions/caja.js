import axios from 'axios';
import {
    GET_CAJA_FAIL,
    GET_CAJA_SUCCESS
} from './types';

export const get_cajas_list = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/cajera/caja_view/`, config);
        console.log(`la solicitu va a: ${process.env.REACT_APP_API_URL}/cajera/caja_view/`)
        if (res.status === 200){
            dispatch({
                type: GET_CAJA_SUCCESS,
                payload: res.data
            });
            console.log("para la caja ubo exito")
        }else{
            dispatch({
                type: GET_CAJA_FAIL
            });
        }

    }catch (error) {
        console.error("Error fetching data:", error);
        dispatch({
            type: GET_CAJA_FAIL
        });
        console.log("para la caja ubo fracaso")
    }

}
