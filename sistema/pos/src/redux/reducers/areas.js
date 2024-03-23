import {
    GET_AREAS_SUCCESS,
    GET_AREAS_FAIL,
} from '../actions/types';

const initialState = {
    areas_list:null
}

export default function areas(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_AREAS_SUCCESS:
            return {
                ...state,
                areas_list: payload.results.areas,
                

            };
        case GET_AREAS_FAIL:
            return {
                ...state,
                areas_list: null,
                
            }

        default:
            return state
    }
}