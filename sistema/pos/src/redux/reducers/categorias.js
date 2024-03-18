import {
    GET_CATEGORIAS_FAIL,
    GET_CATEGORIAS_SUCCESS
} from '../actions/types'

const initialState = {
    categorias: null,
};

export default function categorias(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORIAS_SUCCESS:
            return {
                ...state,
                categorias: payload.categorias
            }
        case GET_CATEGORIAS_FAIL:
            return {
                ...state,
                categorias: null,
            }
        default:
            return state;  
    }
}
