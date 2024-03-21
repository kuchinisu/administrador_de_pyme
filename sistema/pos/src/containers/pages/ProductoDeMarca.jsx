import { Link, useParams } from "react-router-dom";
import { connect,  useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";

import { get_marca } from "../../redux/actions/producosDeMarca";



function ProductoDeMarca() {
    const codigosRegistrados = []
    var ejecutarAutoAdd = true;

    const addCodigoRegistrado = (codigo) => {
        if (isNaN(codigo)) {
            console.error('El código proporcionado no es un número.');
            return;
        }
    
        const codigoInt = parseInt(codigo);
    
        codigosRegistrados.push(codigoInt);
    
        const shouldAutoAdd = (codigosRegistrados.length > 1)
         && (codigosRegistrados[codigosRegistrados.length - 1] < codigoInt - 1);
    
        if (shouldAutoAdd) {
            const missingCodigo = codigosRegistrados[codigosRegistrados.length - 1] + 1;
            autoAddCodigo(missingCodigo);
        }else{
            autoAddCodigo(codigoInt+1)
        }
    };
    

    const autoAddCodigo = (codigo) => {
        const inputCod = document.getElementById("inputCodigo");
        inputCod.value = codigo 
       
        

    }

    const params = useParams();
    const marca = params.marca;
    const categoria = params.categoria;
    const producto = params.producto;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_marca(categoria,marca,producto)); 
      }, [dispatch]);

    
    const mproducto_list = useSelector((state) => state.inventarioMarca.inventario_list);
    
    //funcion para añadir unidades

    const addUnidades = () =>  {
        const botonAdd = document.getElementById("add_boton");
        const inputCodigo = document.getElementById("inputCodigo");

        const datas = {
            codigo:inputCodigo.value,
            producto: producto,
            categoria: categoria,
            marca: marca
        }

        console.log("datos que se enviará al servidor",datas)

        fetch('http://127.0.0.1:8000/administracion/add_unidad/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
        
        
            dispatch(get_marca(categoria,marca,producto)); 
          

    }

    //      fin de la funcion para añadir unidades
    

    return(
        <>
    <div data-theme="cupcake">
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <button
                                id="add_boton"
                                onClick={() => document.getElementById('my_modal_1').showModal()}
                                className="btn btn-secondary"
                            >
                                Añadir
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    <input
                        id="inputCodigo"
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-success w-full max-w-xs"
                    />
                    <form method="dialog">
                        <button onClick={addUnidades} className="btn">Añadir</button>
                    </form>
                </div>
            </div>
        </dialog>

        <div>{marca}</div>
        {mproducto_list ? (
            <div>
                {mproducto_list.map((item, index) => (
                    <div key={index}>
                        {Object.keys(item).map((producto) => (
                            
                            <div key={producto}>
                                
                                {Object.keys(item[producto]["codigos"]&&item[producto]["fechas_caducidad"]).map((codigo, fecha) => 
                                <div>
                                    
                                    {addCodigoRegistrado(parseInt(item[producto]["codigos"][codigo]))}
                                    
                                    <div className="chat chat-start">
                                    <div className="chat-bubble chat-bubble-primary bg-blue-500 text-white p-2 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="mr-2">{parseInt(item[producto]["codigos"][codigo])}</div>
                                                
                                                {item[producto].perecedero && (
                                                    <div className="bg-green-500 text-white px-2 py-1 rounded">
                                                        {fecha}
                                                    </div>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                ) }

                                
                                
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ) : (
            <div></div>
        )}
    </div>
    {console.log("Añadidos: " + codigosRegistrados)}
</>

    
    )
}

const mapStateToProps = state =>({
 
})

export default connect(mapStateToProps,{

})(ProductoDeMarca)