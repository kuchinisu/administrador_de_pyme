import {
    GET_PRODUCTOS_TIPO_DE_MARCA_FAIL,
    GET_PRODUCTOS_TIPO_DE_MARCA_SUCCESS,
} from '../actions/types';

const initialState = {
    productos_tipo: null

} 


export default function inventarioTipoMarca(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_PRODUCTOS_TIPO_DE_MARCA_SUCCESS:
            return {
                ...state,
                productos_tipo: payload.results.productos,
                

            };
        case GET_PRODUCTOS_TIPO_DE_MARCA_FAIL:
            return {
                ...state,
                socios_list: null,
                
            }

        default:
            return state
    }
}
