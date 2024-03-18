import {
    GET_PRODUCTOS_SUCCESS,
    GET_PRODUCTOS_FAIL,
} from '../actions/types'

const initialState = {
    cajera_list: null,
    producto: null,
    count: null,
    next: null,
    previous: null
}

export default function cajera(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_PRODUCTOS_SUCCESS:
            return {
                ...state,
                cajera_list: payload.results.productos,
                count:payload.count,
                next: payload.next,
                previous:payload.previous,

            };
        case GET_PRODUCTOS_FAIL:
            return {
                ...state,
                cajera_list: null,
                producto: null,
                count: null,
                next: null,
                previous: null
            }

        default:
            return state
    }
}

