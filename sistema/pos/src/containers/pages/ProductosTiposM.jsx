import { useParams } from "react-router-dom";
import { connect,  useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { get_marca_tipos } from "../../redux/actions/productosTipoDeMarca";
import { Link } from "react-router-dom";

function ProductosTiposM () {
    const params = useParams()
    const marca = params.marca
    const categoria = params.categoria

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_marca_tipos(categoria,marca)); 
      }, [dispatch]);

      const productos_tipo = useSelector((state) => state.inventarioTipoMarca.productos_tipo);

    return(
        <>
            <div data-theme="cupcake" >
            {/*navbar  */}
            <div className="navbar bg-base-100 ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li>
                        <details>
                        <summary>
                            Parent
                        </summary>
                        <ul className="p-2 bg-base-100 rounded-t-none">
                            <li><a>Link 1</a></li>
                            <li><a>Link 2</a></li>
                        </ul>
                        </details>
                    </li>
                    </ul>
                </div>
                </div>
            

            {/* productos */}

            {productos_tipo ? (
                <lu className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {productos_tipo.map((item) => 
                    <li >
                        
                        
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src={`http://127.0.0.1:8000${item.imagen}`} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                {item.nombre}
                                <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>{item.descripcion}</p>
                                <div className="card-actions justify-end">
                                <Link to={`/administracion/inventario/productos_de/${item.categoria}/${item.marca}/${item.nombre}`} className="hover:underline">
                                        <button className="btn btn-primary">Unidades</button>
                                    </Link>
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                            </div>
                    </li>
                    )}
                </lu>
            ):(
                <div>

                </div>
            )}
        </div>
        </>
    )
}


const mapStateToProps = state =>({
 
})

export default connect(mapStateToProps,{

})(ProductosTiposM)