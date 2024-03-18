import {
    GET_PRODUCTOS_LIST_SUCCESS,
    GET_PRODUCTOS_LIST_FAIL
} from '../actions/types'

const initialState = {
    carrito_list: null
}

export default function carrito(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case GET_PRODUCTOS_LIST_SUCCESS:
            return {
                ...state,
                carrito_list: payload
            };

        
        case GET_PRODUCTOS_LIST_FAIL:
            return {
                ...state,
                carrito_list: null
            } 

        default:
            console.log("se uso el default")
            return state
    }

    

    }