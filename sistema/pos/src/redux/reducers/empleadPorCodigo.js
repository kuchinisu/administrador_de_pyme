import {
    GET_EMPLEAD_ESPECIFICA_FAIL,
    GET_EMPLEAD_ESPECIFICA_SUCCESS,
} from '../actions/types'

const initialState = {
    emplead: null,
    
}

export default function empleadCod(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_EMPLEAD_ESPECIFICA_SUCCESS:
            return {
                ...state,
                emplead: payload.results.emplead,
                

            };
        case GET_EMPLEAD_ESPECIFICA_FAIL:
            return {
                ...state,
                emplead: null,
                
            }

        default:
            return state
    }
}

