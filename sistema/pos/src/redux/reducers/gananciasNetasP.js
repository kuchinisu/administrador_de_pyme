import {
    GET_GANANCIAS_NETAS_FAIL,
    GET_GANANCIAS_NETAS_SUCCESS,
} from '../actions/types'

const initialState = {
    ganancias_netas_list: null,
    
}

export default function gananciasNetas(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_GANANCIAS_NETAS_SUCCESS:
            return {
                ...state,
                ganancias_netas_list: payload.results.ganancias_netas,
                

            };
        case GET_GANANCIAS_NETAS_FAIL:
            return {
                ...state,
                ganancias_netas_list: null,
                
            }

        default:
            return state
    }
}

