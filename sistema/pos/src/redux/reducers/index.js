import  { combineReducers } from 'redux';
import cajera from './cajera';
import carrito from './carrito';
import caja from './caja';
import socios from './socios';
import gananciasNetas from './gananciasNetasP';
import inventario from './inventario';
import inventarioMarca from './productosDeMarca';
import inventarioTipoMarca from './productosTipoDeMarca';
import emplead from './emplead';
import areas from './areas';
import empleadCod from './empleadPorCodigo';

export default combineReducers({
    cajera,
    carrito,
    caja,
    socios,
    gananciasNetas,
    inventario,
    inventarioMarca,
    inventarioTipoMarca,
    emplead,
    areas,
    empleadCod,
})