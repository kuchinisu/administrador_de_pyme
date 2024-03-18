import axios from "axios";
import {
    GET_PRODUCTOS_LIST_SUCCESS,
    GET_PRODUCTOS_LIST_FAIL,
    AGREGAR_PRODUCTO_SUCCESS,
    AGREGAR_PRODUCTO_FAIL
} from './types'; 

export const add_items_carrito = (items) => async dispatch => {
    
    try{
        
        dispatch({
            type: AGREGAR_PRODUCTO_SUCCESS,
            payload: items
        });

    }catch(error){
        dispatch({
            type: AGREGAR_PRODUCTO_FAIL
        });

        console.log(error)
    }
    

}