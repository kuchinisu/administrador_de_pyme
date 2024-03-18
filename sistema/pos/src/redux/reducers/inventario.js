import {
    GET_INVENTARIO_FAIL,
    GET_INVENTARIO_SUCCESS,
} from '../actions/types'

const initialState = {
    inventario_list: null,
    
}

export default function inventario(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_INVENTARIO_SUCCESS:
            return {
                ...state,
                inventario_list: payload.resultados,
                

            }; 
        case GET_INVENTARIO_FAIL:
            return {
                ...state,
                inventario_list: null,
                
            }

        default:
            return state
    }
}

