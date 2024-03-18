import {
    GET_PRODUCTOS_DE_MARCA_FAIL,
    GET_PRODUCTOS_DE_MARCA_SUCCESS,
} from '../actions/types'

const initialState = {
    marca_productos_list: null,
    
}

export default function inventarioMarca(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_PRODUCTOS_DE_MARCA_SUCCESS:
            return {
                ...state,
                inventario_list: payload.respuesta,
                

            }; 
        case GET_PRODUCTOS_DE_MARCA_FAIL:
            return {
                ...state,
                inventario_list: null,
                
            }

        default:
            return state
    }
}

