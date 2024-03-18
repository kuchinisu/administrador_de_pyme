import {
    GET_SOCIOS_SUCCESS,
    GET_SOCIOS_FAIL,
} from '../actions/types';

const initialState = {
    socios_list: null

} 


export default function socios(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_SOCIOS_SUCCESS:
            return {
                ...state,
                socios_list: payload.results.socios,
                

            };
        case GET_SOCIOS_FAIL:
            return {
                ...state,
                socios_list: null,
                
            }

        default:
            return state
    }
}

