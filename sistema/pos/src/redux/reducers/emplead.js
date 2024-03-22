import {
    GET_EMPLEAD_SUCCESS,
    GET_EMPLEAD_FAIL,
} from '../actions/types'

const initialState = {
    emplead_list: null,
    emplead: null,
    count: null,
    next: null,
    previous: null
}

export default function emplead(state = initialState, action){
    const { type, payload } = action;

    switch(type) {

        case GET_EMPLEAD_SUCCESS:
            return {
                ...state,
                emplead_list: payload.results.empleades,
                count:payload.count,
                next: payload.next,
                previous:payload.previous,

            };
        case GET_EMPLEAD_FAIL:
            return {
                ...state,
                emplead_list: null,
                emplead: null,
                count: null,
                next: null,
                previous: null
            }

        default:
            return state
    }
}

