import axios from 'axios';

import {
    GET_AREAS_SUCCESS,
    GET_AREAS_FAIL,
} from './types';

export const get_areas_list = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/rh/areas/`, config);
        console.log(`la solicitu va a: ${process.env.REACT_APP_API_URL}/rh/areas/`)
        if (res.status === 200){
            dispatch({
                type: GET_AREAS_SUCCESS,
                payload: res.data
            }); 
        }else{
            dispatch({
                type: GET_AREAS_FAIL
            });
        }

    }catch (error) {
        console.error("Error fetching data:", error);
        dispatch({
            type: GET_AREAS_FAIL
        });
    }

}
