import {
    GET_CAJA_SUCCESS,
    GET_CAJA_FAIL,
} from '../actions/types';

const initialState = {
    cajas_list: null

} 


export default function caja(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_CAJA_SUCCESS:
            return {
                ...state,
                cajas_list: payload.results.cajas,
                

            };
        case GET_CAJA_FAIL:
            return {
                ...state,
                cajas_list: null,
                
            }

        default:
            return state
    }
}

