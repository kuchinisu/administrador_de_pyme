import  { combineReducers } from 'redux';
import cajera from './cajera';
import carrito from './carrito';
import caja from './caja';
import socios from './socios';
import gananciasNetas from './gananciasNetasP';
import inventario from './inventario';
import inventarioMarca from './productosDeMarca';

export default combineReducers({
    cajera,
    carrito,
    caja,
    socios,
    gananciasNetas,
    inventario,
    inventarioMarca
})