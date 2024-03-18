import { connect,  useSelector, useDispatch} from "react-redux";
import {  useEffect, useState } from "react";
import { get_inventario } from '../../../redux/actions/inventario';
import { Link } from "react-router-dom"


function Inventario() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_inventario()); 
      }, [dispatch]);

    const inventario_list = useSelector((state) => state.inventario.inventario_list);

    return(
        <>
        <div data-theme="cupcake">
            {/* navbar especial */}
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                        <a>Parent</a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                        <summary>Parent</summary>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
                </div>
                {/* navbar especial final */}
                <div>
                    este es el inventario

                    <div>
    {inventario_list ? (
        <div>
            {inventario_list.map((item, index) => (
                <div key={index}>
                    <div className="divider"/>
                        {Object.keys(item).map((categoria) => 
                        <div>
                            <div id="categoria">
                                {categoria}
                            </div>
                            
                            <div style={{ display: 'flex', marginLeft:'30px'}} id="marcas">
                            {Object.keys(item[categoria]).map((marca) => 
                                <div style={{ display: 'flex', marginLeft:'30px'}} className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                  <h2 className="card-title">{marca}</h2>
                                  <p>If a dog chews shoes whose shoes does he choose?</p>
                                  <div className="card-actions justify-end">

                                    
                                    <Link to={`/administracion/inventario/productos_de/${categoria}/${marca}`} className="hover:underline">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </Link>
                                  
                                  </div>
                                </div>
                              </div>
                                
                            )}
                            </div>

                        </div>

                        ) }
                </div>
            ))}
            <div className="divider"/>
        </div>
    ) : (
        <div>No hay datos disponibles</div>
    )}
</div>




                </div>

        </div>
        </>
    )
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    
})(Inventario)