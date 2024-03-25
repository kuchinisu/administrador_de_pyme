import axios from "axios";
import {
    GET_PRODUCTOS_SUCCESS,
    GET_PRODUCTOS_FAIL,
    GET_MARCAS_SUCCESS,
    GET_CATEGORIAS_SUCCESS,
    GET_CAJERA_PAGINATION_RESULTS_SUCCESS,
    GET_CAJERA_PAGINATION_RESULTS_FAIL

} from "./types"

export const get_cajera_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/cajera/caja/`, config);
        console.log(`${process.env.REACT_APP_API_URL}/cajera/caja/`)
        if (res.status === 200){
            //window.alert(res.data)
            dispatch({
                type: GET_PRODUCTOS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PRODUCTOS_FAIL
            });
        }

    }catch (error) {
        console.error("Error fetching data:", error);
        dispatch({
            type: GET_PRODUCTOS_FAIL
        });
    }
    
}

export const get_cajera_list_page = (p) => async dispatch => {

    const config = {
        headers: {
            'Accepts': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/administracion/cajera/?p=${p}`, config);

        if (res.status === 200){
            dispatch({
                type: GET_PRODUCTOS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PRODUCTOS_FAIL
            });
        } 

    }catch{
        dispatch({
            type:GET_PRODUCTOS_FAIL
        })
    }
    

}