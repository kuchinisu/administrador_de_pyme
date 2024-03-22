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

    const addCategoria = () => {
        const input = document.getElementById("inputCategoriaN");
        
        const data = {
            "categoria":input.value,
        }
        fetch('http://127.0.0.1:8000/administracion/add_categoria/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    }

    const addMarca = () => {
        var inputMarcaNombre = document.getElementById("inputMarcaN");
        var inputMarcaImg = document.getElementById("inputMarcaImg");

        const data = {
            //"imagen":inputMarcaImg.value,
            "marca":inputMarcaNombre.value,
        }
        fetch('http://127.0.0.1:8000/administracion/add_marca/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    }

    const addProducto = (index, categoriaIndex) => {
        const inputProductoNombre = document.getElementById(`inputProductoN_${index}_${categoriaIndex}`).value;
        const inputProductoD = document.getElementById(`inputProductoD_${index}_${categoriaIndex}`).value;
        const inputProductoImg = document.getElementById(`inputProductoImg_${index}_${categoriaIndex}`).files[0];
        const inputProductoP = document.getElementById(`inputProductoPrecio_${index}_${categoriaIndex}`).value;
        const inputProductoC = document.getElementById(`inputProductoCosto_${index}_${categoriaIndex}`).value;
        const inputProductoBool = document.getElementById(`inputProductoPerecedero_${index}_${categoriaIndex}`).value;
        const selectProductoInventario = document.getElementById(`inputProductoModo_${index}_${categoriaIndex}`).value;
        const inputProductoCategoria = document.getElementById(`inputProductoCategoria_${index}_${categoriaIndex}`).value;
        const inputMarca = document.getElementById(`inputMarca_${index}_${categoriaIndex}`).value;
    
        const formData = new FormData();
        formData.append('nombre', inputProductoNombre);
        formData.append('descripcion', inputProductoD);
        formData.append('imagen', inputProductoImg);
        formData.append('precio', inputProductoP);
        formData.append('costo', inputProductoC);
        formData.append('perecedero', inputProductoBool);
        formData.append('modo_inventario', selectProductoInventario);
        formData.append('categoria', inputProductoCategoria);
        formData.append('marca', inputMarca);
    
        fetch('http://127.0.0.1:8000/administracion/add_producto/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    }
    

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
                    <button id="addCategoria" onClick={()=>document.getElementById('my_modal_1').showModal()} className="btn">añadir categoria</button>
                </div>
                </div>
                {/* navbar especial final */}
                <div>
                    este es el inventario
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                            <input id="inputCategoriaN" type="text" placeholder="nombre de la categoria" className="input input-bordered w-full max-w-xs" />
                            <form method="dialog">
                                <button onClick={addCategoria} className="btn">Close</button>
                            </form>
                            </div>
                        </div>
                        </dialog>
                    <div>
                    {inventario_list ? (
    <div>
            {inventario_list.map((item, index) => (
                <div className="table-pin-cols" key={index}>
                    <div className="divider"/>
                    {Object.keys(item).map((categoria, categoriaIndex) => (
                        <div key={categoriaIndex}>
                            <div id={`categoria_${index}_${categoriaIndex}`}>
                                {categoria}
                                <button className="btn btn-secondary" style={{ position: 'absolute', right: 0 }}
                                    onClick={() => document.getElementById(`my_modal_${index}_${categoriaIndex}`).showModal()}>
                                    añadir productos
                                </button>
                            </div>
                            {/* Área del diálogo */}

                            <dialog id={`my_modal_${index}_${categoriaIndex}`} className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Producto</h3>
                                    <p className="py-4">Press ESC key or click the button below to close</p>
                                    
                                    <input style={{marginBottom: '5px'}} id={`inputProductoN_${index}_${categoriaIndex}`} type="text" placeholder="nombre del producto" className="input input-bordered w-full max-w-xs" />
                                    
                                    <div style={{marginBottom: '5px'}}>
                                        <textarea id={`inputProductoD_${index}_${categoriaIndex}`}  className="textarea textarea-info" placeholder="Descripcion"></textarea>
                                    </div>

                                    <div style={{marginBottom: '5px'}}>
                                        <input id={`inputProductoImg_${index}_${categoriaIndex}`} type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                                    </div>

                                    <div style={{marginBottom: '5px'}}>
                                        <input id={`inputProductoPrecio_${index}_${categoriaIndex}`} type="text" placeholder="precio" className="input input-bordered w-full max-w-xs"/>

                                    </div>

                                    <div style={{marginBottom: '5px'}}>
                                        <input id={`inputProductoCosto_${index}_${categoriaIndex}`}  type="text" placeholder="costo" className="input input-bordered w-full max-w-xs"/>
                                    </div>


                                    <div style={{marginBottom: '5px'}} className="form-control">
                                        <label className="cursor-pointer label">
                                            <input id={`inputProductoPerecedero_${index}_${categoriaIndex}`} type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                            <span className="label-text">Perecedero</span>
                                        </label>
                                    </div>

                                    <select id={`inputProductoModo_${index}_${categoriaIndex}`} className="select select-primary w-full max-w-xs">
                                        <option disabled selected>modo de inventario</option>
                                        <option>contabilizado</option>
                                        <option>JIT</option>
                                    </select>

                                    <input style={{marginBottom: '5px'}} id={`inputProductoCategoria_${index}_${categoriaIndex}`} type="text" value={categoria} placeholder="categoria" className="input input-bordered w-full max-w-xs"/>

                                    <input style={{marginBottom: '5px'}} id={`inputMarca_${index}_${categoriaIndex}`} type="text" placeholder="marca del producto"  className="input input-bordered w-full max-w-xs" />

                                    
                                    <div className="modal-action">
                                        <div id="categoriaEscondida" style={{display: 'none'}}>{categoria}</div>
                                        <form method="dialog">
                                        <button onClick={() => addProducto(index, categoriaIndex)} className="btn">añadir</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>

                            {/* Fin del área del diálogo */}
                            <div style={{ display: 'flex', marginLeft: '30px' }} id="marcas">
                                {Object.keys(item[categoria]).map((marca, marcaIndex) => (
 
                                        <lu className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {Object.keys(item[categoria][marca]).map((producto, productoIndex)  => 
                                            <div>
                                                
                                                <div className="card w-96 bg-base-100 shadow-xl">
                                                    <figure><img  src={`http://127.0.0.1:8000${item[categoria][marca][producto]["imagen"]}`}  alt="Shoes" /></figure>
                                                    <div className="card-body">
                                                        <h2 className="card-title">{item[categoria][marca][producto]["nombre"]}</h2>
                                                        <p>{item[categoria][marca][producto]["descripcion"]}</p>

                                                        <p>precio: ${item[categoria][marca][producto]["precio"]}</p>
                                                        <p>costo: ${item[categoria][marca][producto]["costo"]}</p>
                                                        <div className="card-actions justify-end">

                                                        <Link to={`/administracion/inventario/productos_de/${categoria}/${marca}/${producto}`}>
                                                            <button className="btn btn-primary">lista de unidades</button>
                                                        </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            )}
                                        </lu>

                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="divider" />
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